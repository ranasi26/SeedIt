import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "./firebase";

export type Preferences = {
  outdoorAccess: "none" | "balcony" | "patio" | "yard";
  sunlight: "low" | "medium" | "bright";
  capacity: "small" | "medium" | "large";
  goals: string[]; // ["herbs","decor",...]
};


export type PlantItem = {
  id: string;
  name: string;
  sun: "low" | "medium" | "bright";
  indoorOk: boolean;
  outdoorOk: boolean;
  outdoorAccessOk?: string[];
  size: "small" | "medium" | "large";
  goals: string[];
  waterFrequencyDays?: number;
  imageUrl?: string;
  species?: string;
  difficulty?: string;
};

function scorePlant(prefs: Preferences, plant: PlantItem) {
  let score = 0;

  // goals match
  const plantGoals = new Set(plant.goals || []);
  for (const g of prefs.goals || []) {
    if (plantGoals.has(g)) score += 3;
  }

  // sunlight exact match
  if (plant.sun === prefs.sunlight) score += 2;

  // size fit
  const rank: Record<string, number> = { small: 1, medium: 2, large: 3 };
  if (rank[plant.size] <= rank[prefs.capacity]) score += 2;

  // easy is a plus (optional)
  if (plant.difficulty === "easy") score += 1;

  return score;
}

export async function getRecommendations(prefs: Preferences) {
  const candidates: PlantItem[] = [];

  // 1) indoor always
  const indoorQ = query(
    collection(db, "plants_catalog"),
    where("indoorOk", "==", true),
    where("sun", "==", prefs.sunlight),
    limit(60)
  );

  const indoorSnap = await getDocs(indoorQ);
  indoorSnap.forEach((d) => {
    candidates.push({ id: d.id, ...(d.data() as any) });
  });

  // 2) outdoor only if chosen
  if (prefs.outdoorAccess !== "none") {
    const outdoorQ = query(
      collection(db, "plants_catalog"),
      where("outdoorOk", "==", true),
      where("sun", "==", prefs.sunlight),
      where("outdoorAccessOk", "array-contains", prefs.outdoorAccess),
      limit(60)
    );

    const outdoorSnap = await getDocs(outdoorQ);
    outdoorSnap.forEach((d) => {
      candidates.push({ id: d.id, ...(d.data() as any) });
    });
  }

  // remove duplicates
  const unique = new Map(candidates.map((p) => [p.id, p]));
  const list = Array.from(unique.values());

  // score and sort
  return list
    .map((p) => ({ plant: p, score: scorePlant(prefs, p) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((x) => x.plant);
}

