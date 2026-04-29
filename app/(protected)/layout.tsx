import { RootLayoutShell } from "@/components/layout/RootLayoutShell";
import { ProtectedRoute } from "@/components/features/auth/ProtectedRoute";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <RootLayoutShell>{children}</RootLayoutShell>
    </ProtectedRoute>
  );
}
