"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoading(false);
    setUser({
      full_name: "Operator",
      role: "Staff",
      subscription_tier: "Free",
    });
  }, [setIsLoading, setUser]);

  return <>{children}</>;
}
