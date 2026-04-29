import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function AuthPages({ mode }: { mode: "login" }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
      <Card>
        <h1 className="mb-4 text-xl font-semibold">{mode === "login" ? "Sign in" : "Auth"}</h1>
        <div className="space-y-3">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button type="button" className="w-full">
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
