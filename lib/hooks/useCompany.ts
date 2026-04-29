import { useMemo } from "react";

export function useCompany() {
  return useMemo(() => ({
    company: null,
  }), []);
}
