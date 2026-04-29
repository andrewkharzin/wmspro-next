"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Box,
  Building2,
  ChevronRight,
  Globe,
  LayoutDashboard,
  Layers,
  Package,
  ShoppingBag,
  Tag,
  Truck,
  User,
  Users,
  Warehouse,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/cn";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

type ChildItem = { href?: string; label: string; icon: React.ReactNode };
type MenuItem = {
  href?: string;
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: ChildItem[];
};

const menuItems: MenuItem[] = [
  { id: "dashboard", href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} strokeWidth={1.5} /> },
  { id: "marketplace", label: "Marketplace", icon: <ShoppingBag size={18} strokeWidth={1.5} /> },
  {
    id: "warehouse",
    label: "Warehouse",
    icon: <Warehouse size={18} strokeWidth={1.5} />,
    children: [
      { label: "Locations", icon: <Globe size={16} strokeWidth={1.5} /> },
      { label: "Zone Control", icon: <Box size={16} strokeWidth={1.5} /> },
      { href: "/inventory", label: "Inventory", icon: <Package size={16} strokeWidth={1.5} /> },
      { label: "Batches", icon: <Layers size={16} strokeWidth={1.5} /> },
      { label: "Categories", icon: <Tag size={16} strokeWidth={1.5} /> },
    ],
  },
  { id: "movements", label: "Movements", icon: <Truck size={18} strokeWidth={1.5} /> },
  { id: "contacts", label: "Contacts", icon: <Building2 size={18} strokeWidth={1.5} /> },
  { id: "reports", label: "Reports", icon: <BarChart3 size={18} strokeWidth={1.5} /> },
  { id: "users", label: "Users", icon: <Users size={18} strokeWidth={1.5} /> },
  { id: "account", href: "/account", label: "Account", icon: <User size={18} strokeWidth={1.5} /> },
];

function isPathActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [warehouseOpen, setWarehouseOpen] = useState(true);
  const user = useAuthStore((state) => state.user);
  const avatarUrl = useMemo(
    () =>
      user?.avatar_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || "User")}&background=0052FF&color=fff&bold=true&size=64`,
    [user?.avatar_url, user?.full_name],
  );

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.6 }}
      className="fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-white/10 bg-slate-950 shadow-2xl md:flex"
      style={{ contain: "layout style" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-indigo-500/5" />

      <div className="relative z-10 flex min-h-[80px] items-center gap-3 border-b border-white/5 p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#0052FF] text-xl font-black text-white shadow-xl shadow-blue-500/20">
          N
        </div>
        {!isCollapsed && (
          <div className="whitespace-nowrap">
            <h1 className="text-lg font-bold tracking-tight text-white">
              Nexus<span className="text-blue-500">AI</span>
            </h1>
            <p className="mt-0.5 text-[9px] font-black uppercase tracking-widest text-slate-500">
              Control Terminal
            </p>
          </div>
        )}
      </div>

      <nav className="relative z-10 flex-1 overflow-y-auto py-8" style={{ contain: "layout style" }}>
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const active = item.href
              ? isPathActive(pathname, item.href)
              : item.children?.some((child) => isPathActive(pathname, child.href));
            const itemClass = cn(
              "flex w-full items-center gap-3 rounded-sm px-4 py-3 transition-all duration-150",
              active
                ? "bg-[#0052FF] text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/10"
                : "text-slate-400 hover:bg-white/5 hover:text-white",
              isCollapsed && "justify-center",
            );

            return (
              <li key={item.id}>
                {item.href ? (
                  <Link href={item.href} className={itemClass}>
                    <span className={cn("shrink-0", active ? "text-white" : "text-slate-500")}>{item.icon}</span>
                    {!isCollapsed && <span className="flex-1 truncate text-left text-xs font-bold tracking-tight">{item.label}</span>}
                  </Link>
                ) : (
                  <button type="button" onClick={() => (item.children ? setWarehouseOpen((prev) => !prev) : undefined)} className={itemClass}>
                    <span className={cn("shrink-0", active ? "text-white" : "text-slate-500")}>{item.icon}</span>
                    {!isCollapsed && <span className="flex-1 truncate text-left text-xs font-bold tracking-tight">{item.label}</span>}
                  </button>
                )}

                {!isCollapsed && item.children && warehouseOpen && (
                  <ul className="mt-1 ml-4 space-y-1 border-l border-white/5 pl-4">
                    {item.children.map((child) => {
                      const childActive = isPathActive(pathname, child.href);
                      return (
                        <li key={`${item.id}-${child.label}`}>
                          {child.href ? (
                            <Link
                              href={child.href}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-sm px-4 py-2 transition-all duration-150",
                                childActive
                                  ? "bg-white/10 text-white ring-1 ring-white/5"
                                  : "text-slate-500 hover:bg-white/5 hover:text-white",
                              )}
                            >
                              <span className={cn("shrink-0", childActive ? "text-blue-400" : "text-slate-600")}>{child.icon}</span>
                              <span className="truncate text-[11px] font-bold tracking-tight">{child.label}</span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              className="flex w-full items-center gap-3 rounded-sm px-4 py-2 text-slate-500 transition-all duration-150 hover:bg-white/5 hover:text-white"
                            >
                              <span className="shrink-0 text-slate-600">{child.icon}</span>
                              <span className="truncate text-[11px] font-bold tracking-tight">{child.label}</span>
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 z-50 rounded-full border border-white/10 bg-slate-900 p-1.5 text-slate-400 shadow-xl transition-all duration-200 hover:border-blue-500/50 hover:text-blue-500"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronRight size={12} strokeWidth={4} className={cn("transition-transform duration-200", !isCollapsed && "rotate-180")} />
      </button>

      <div className="relative z-10 space-y-2 border-t border-white/5 p-4">
        <Link
          href="/account"
          className={cn(
            "group flex items-center gap-3 rounded-sm border border-white/5 bg-white/5 p-3 transition-all hover:bg-white/10",
            isCollapsed && "justify-center",
            isPathActive(pathname, "/account") && "bg-blue-500/10 ring-1 ring-blue-500",
          )}
        >
          <div className="relative shrink-0">
            <Image
              src={avatarUrl}
              width={32}
              height={32}
              className="rounded-sm object-cover grayscale transition-all group-hover:grayscale-0"
              alt="Avatar"
              unoptimized
            />
            <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-500" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-black text-white">{user?.full_name || "Loading..."}</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">{user?.role || "Staff"}</p>
            </div>
          )}
        </Link>
      </div>
    </motion.aside>
  );
}
