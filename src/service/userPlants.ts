import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

type SaveUserPlantParams = {
  userEmail: string;
  userName: string;
  plantName: string;
  species: string;
  image: string;
  waterFrequency: number;
  sunlight: "low" | "medium" | "high";
  notes: string;
  difficulty: "easy" | "medium" | "hard";
};

type UpdateUserPlantParams = {
  id: string;
  name?: string;
  species?: string;
  image?: string;
  waterFrequency?: number;
  lastWatered?: Date;
  sunlight?: "low" | "medium" | "high";
  notes?: string;
  plantedDate?: Date;
  currentStage?: "seed" | "seedling" | "growing" | "mature";
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
};

export async function saveUserPlant(params: SaveUserPlantParams) {
  const docRef = await addDoc(collection(db, "user_plants"), {
    userEmail: params.userEmail,
    userName: params.userName,
    plantName: params.plantName,
    species: params.species,
    image: params.image,
    waterFrequency: params.waterFrequency,
    sunlight: params.sunlight,
    notes: params.notes,
    difficulty: params.difficulty,
    plantedDate: serverTimestamp(),
    lastWatered: serverTimestamp(),
    currentStage: "seed",
    tags: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

    return docRef.id;
}

export async function getUserPlants(userEmail: string) {
  const q = query(
    collection(db, "user_plants"),
    where("userEmail", "==", userEmail)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      name: data.plantName,
      species: data.species,
      image: data.image,
      waterFrequency: data.waterFrequency,
      lastWatered: data.lastWatered?.toDate ? data.lastWatered.toDate() : new Date(),
      sunlight: data.sunlight,
      notes: data.notes || '',
      plantedDate: data.plantedDate?.toDate ? data.plantedDate.toDate() : new Date(),
      currentStage: data.currentStage || "seed",
      difficulty: data.difficulty || "easy",
      tags: data.tags || [],
    };
  });
}

export async function updateUserPlant(params: UpdateUserPlantParams) {
  const plantRef = doc(db, "user_plants", params.id);

  const updateData: any = {
    updatedAt: serverTimestamp(),
  };

  if (params.name !== undefined) updateData.plantName = params.name;
  if (params.species !== undefined) updateData.species = params.species;
  if (params.image !== undefined) updateData.image = params.image;
  if (params.waterFrequency !== undefined) updateData.waterFrequency = params.waterFrequency;
  if (params.lastWatered !== undefined) updateData.lastWatered = params.lastWatered;
  if (params.sunlight !== undefined) updateData.sunlight = params.sunlight;
  if (params.notes !== undefined) updateData.notes = params.notes;
  if (params.plantedDate !== undefined) updateData.plantedDate = params.plantedDate;
  if (params.currentStage !== undefined) updateData.currentStage = params.currentStage;
  if (params.difficulty !== undefined) updateData.difficulty = params.difficulty;
  if (params.tags !== undefined) updateData.tags = params.tags;

  await updateDoc(plantRef, updateData);
}

export async function deleteUserPlant(id: string) {
  await deleteDoc(doc(db, "user_plants", id));
}