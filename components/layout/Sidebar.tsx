import Link from "next/link";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/account", label: "Account" },
  { href: "/inventory", label: "Inventory" },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-200 p-4 dark:border-zinc-800">
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
