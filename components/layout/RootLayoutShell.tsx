"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Database,
  LayoutGrid,
  LogOut,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/cn";

const TAB_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  inventory: "Inventory",
  account: "Account",
};

export function RootLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useAuthStore((state) => state.user);

  const activeTab = useMemo(() => {
    if (pathname.startsWith("/inventory")) return "inventory";
    if (pathname.startsWith("/account")) return "account";
    return "dashboard";
  }, [pathname]);

  const avatarUrl =
    user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || "User")}&background=0052FF&color=fff&bold=true&size=160`;

  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-[#FDFDFF] antialiased selection:bg-blue-100 selection:text-blue-900">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-5%] top-[-5%] h-[40%] w-[40%] rounded-full bg-blue-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] h-[40%] w-[40%] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
      </div>

      <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed((prev) => !prev)} />

      <main
        className={cn(
          "relative z-10 mb-20 flex flex-1 flex-col transition-all duration-200 ease-out md:mb-0",
          isCollapsed ? "md:ml-20" : "md:ml-64",
        )}
      >
        <header className="sticky top-0 z-[100] flex items-center justify-between border-b border-slate-200/40 bg-white/80 px-6 py-5 backdrop-blur-3xl md:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0052FF] text-lg font-bold text-white shadow-lg md:hidden">
              N
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                {TAB_TITLES[activeTab] || activeTab}
              </h1>
              <div className="mt-0.5 flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  network secure • terminal
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden items-center rounded-sm border border-slate-200/50 bg-slate-100/60 p-1 sm:flex">
              <button type="button" className="rounded-sm bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#0052FF] shadow-sm">
                EN
              </button>
              <button type="button" className="rounded-sm px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">
                RU
              </button>
            </div>

            <div className="hidden w-64 items-center rounded-sm border border-slate-200/50 bg-slate-100/40 px-4 py-2.5 transition-all focus-within:w-80 focus-within:bg-white focus-within:ring-8 focus-within:ring-blue-500/5 lg:flex">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search inventory..."
                className="ml-2 w-full border-none bg-transparent text-xs font-bold text-slate-700 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <button type="button" className="relative p-2.5 text-slate-400 transition-all hover:text-[#0052FF]">
                <MessageCircle size={20} strokeWidth={2} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-blue-500" />
              </button>
              <button type="button" className="group relative p-2.5 text-slate-400 transition-all hover:text-[#0052FF]" title="Open marketplace">
                <ShoppingBag size={20} strokeWidth={2} />
              </button>
              <button type="button" className="relative p-2.5 text-slate-400 transition-colors hover:text-slate-900">
                <Bell size={20} strokeWidth={2} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
              </button>
            </div>

            <div className="mx-2 hidden h-8 w-px bg-slate-200/50 sm:block" />

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-full border border-transparent p-1 transition-all hover:border-slate-100 hover:bg-slate-50"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-slate-900 shadow-lg">
                  <Image
                    src={avatarUrl}
                    fill
                    sizes="36px"
                    className="object-cover"
                    alt="Profile"
                    unoptimized
                  />
                </div>
                <ChevronDown size={14} className={cn("text-slate-400 transition-transform", isProfileMenuOpen && "rotate-180")} />
              </button>

              {isProfileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)} />
                  <div className="absolute right-0 z-20 mt-3 w-72 rounded-sm border border-slate-100 bg-white py-4 shadow-2xl">
                    <div className="border-b border-slate-50 px-6 py-4">
                      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Authorized User</p>
                      <h4 className="truncate font-black text-slate-900">{user?.full_name || "Loading..."}</h4>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="flex items-center gap-1 rounded-sm border border-blue-100 bg-blue-50 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-blue-600">
                          <ShieldCheck size={10} /> {user?.role || "Staff"} • {user?.subscription_tier || "Free"}
                        </span>
                      </div>
                    </div>

                    <div className="py-2">
                      {[
                        { label: "Market Profile", icon: <User size={14} /> },
                        { label: "Procurement Ledger", icon: <ShoppingBag size={14} /> },
                        { label: "Messenger Terminal", icon: <MessageCircle size={14} /> },
                        { label: "System Diagnostics", icon: <Database size={14} /> },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex w-full items-center gap-3 px-6 py-3 text-slate-500 transition-all hover:bg-slate-50 hover:text-blue-600"
                        >
                          <span className="shrink-0">{item.icon}</span>
                          <span className="flex-1 text-left text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                          <ChevronDown size={12} className="-rotate-90 opacity-20" />
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 px-4">
                      <button
                        type="button"
                        className="group flex w-full items-center justify-between rounded-sm bg-rose-50 p-3 text-rose-600 transition-all hover:bg-rose-100"
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">Logout System</span>
                        <LogOut size={14} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              className="group flex items-center gap-2 rounded-sm bg-[#0052FF] px-5 py-2.5 shadow-xl shadow-blue-500/10 transition-all hover:bg-slate-950 active:scale-95"
            >
              <Sparkles size={16} className="text-white transition-transform group-hover:rotate-12" />
              <span className="hidden text-[10px] font-black uppercase tracking-widest text-white sm:inline">Ask Assistant</span>
            </button>
          </div>
        </header>

        <div className={cn("flex-1 animate-[fadeIn_180ms_ease-out]", activeTab === "dashboard" ? "p-0" : "p-6 md:p-10")}>{children}</div>
      </main>

      <nav className="fixed bottom-6 left-1/2 z-[100] flex h-18 w-[90%] -translate-x-1/2 items-center justify-around rounded-sm border border-slate-200/50 bg-white/80 px-4 shadow-2xl backdrop-blur-2xl md:hidden">
        {[
          { href: "/dashboard", icon: <LayoutGrid size={22} />, label: "Nexus" },
          { href: "/inventory", icon: <ShoppingBag size={22} />, label: "Assets" },
          { href: "/dashboard", icon: <Search size={22} />, label: "Flow" },
        ].map((btn) => {
          const isActive = pathname.startsWith(btn.href);
          return (
            <a key={btn.label} href={btn.href} className={cn("flex flex-col items-center gap-1.5", isActive ? "text-[#0052FF]" : "text-slate-400")}>
              {btn.icon}
              <span className="text-[9px] font-black uppercase tracking-tighter">{btn.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
