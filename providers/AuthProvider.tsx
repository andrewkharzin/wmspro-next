"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUserId = useAuthStore((state) => state.setUserId);

  useEffect(() => {
    setUserId(null);
  }, [setUserId]);

  return <>{children}</>;
}
