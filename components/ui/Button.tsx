import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black ${className}`}
      {...props}
    />
  );
}
