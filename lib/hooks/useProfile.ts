import { useMemo } from "react";
import { profileService } from "@/lib/services/profile.service";

export function useProfile(userId?: string) {
  return useMemo(() => ({
    profile: userId ? { id: userId } : null,
    updateProfile: (updates: Record<string, unknown>) =>
      userId ? profileService.updateProfile(userId, updates) : Promise.resolve(null),
  }), [userId]);
}
