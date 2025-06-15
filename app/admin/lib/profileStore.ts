// app/lib/profileStore.ts

import { UserProfile } from "@/types";

let profiles: UserProfile[] = [];

export function getProfiles(): UserProfile[] {
  return profiles;
}

export function addOrUpdateProfile(profile: UserProfile): void {
  const index = profiles.findIndex((p) => p.userId === profile.userId);
  if (index !== -1) {
    profiles[index] = profile;
  } else {
    profiles.push(profile);
  }
}

export function clearProfiles(): void {
  profiles = [];
}
