import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { UserProfile } from "../App";

function makeUserDocId(email: string) {
  return email.toLowerCase().trim();
}

export async function saveUserProfile(profile: UserProfile) {
  const docId = makeUserDocId(profile.email);

  await setDoc(
    doc(db, "users", docId),
    {
      ...profile,
      hasCompletedOnboarding: true,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getUserProfile(email: string) {
  const docId = makeUserDocId(email);
  const snap = await getDoc(doc(db, "users", docId));

  if (!snap.exists()) return null;

  return snap.data() as UserProfile & { hasCompletedOnboarding?: boolean };
}