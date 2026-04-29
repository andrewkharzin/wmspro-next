import type { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      {children}
    </div>
  );
}
