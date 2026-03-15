import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export type DiagnosisHistoryItem = {
  id?: string;
  userEmail: string;
  userName: string;
  imageUrl: string;
  plantName?: string;
  scientificName?: string;
  healthStatus: "healthy" | "diseased" | "unknown";
  diseases: Array<{
    name: string;
    probability: number;
    description: string;
    treatment: string;
  }>;
  createdAt?: Date;
};

export async function saveDiagnosisHistory(item: DiagnosisHistoryItem) {
  const docRef = await addDoc(collection(db, "diagnosis_history"), {
    userEmail: item.userEmail,
    userName: item.userName,
    imageUrl: item.imageUrl,
    plantName: item.plantName || "",
    scientificName: item.scientificName || "",
    healthStatus: item.healthStatus,
    diseases: item.diseases,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getDiagnosisHistory(userEmail: string) {
  const q = query(
    collection(db, "diagnosis_history"),
    where("userEmail", "==", userEmail),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      userEmail: data.userEmail,
      userName: data.userName,
      imageUrl: data.imageUrl || "",
      plantName: data.plantName || "",
      scientificName: data.scientificName || "",
      healthStatus: data.healthStatus || "unknown",
      diseases: data.diseases || [],
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
    };
  });
}