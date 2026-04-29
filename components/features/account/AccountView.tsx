import { CompanyTab } from "@/components/features/account/CompanyTab";
import { ProfileTab } from "@/components/features/account/ProfileTab";

export function AccountView() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Account</h1>
      <ProfileTab />
      <CompanyTab />
    </section>
  );
}
