import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Users2,
  Briefcase,
  UserRound,
  Activity as ActivityIcon,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users2 },
  { to: "/deals", label: "Pipeline", icon: Briefcase },
  { to: "/customers", label: "Customers", icon: UserRound },
  { to: "/activities", label: "Activities", icon: ActivityIcon },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden md:flex w-60 flex-col border-r bg-sidebar text-sidebar-foreground">
        <div className="px-5 py-5 flex items-center gap-2 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center font-bold">A</div>
          <div>
            <div className="font-semibold text-sm leading-tight">Apex CRM</div>
            <div className="text-[11px] text-muted-foreground">Enterprise edition</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/15 text-primary grid place-items-center text-xs font-semibold">PS</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Priya Shah</div>
              <div className="text-[11px] text-muted-foreground truncate">Admin · APAC</div>
            </div>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b bg-background flex items-center gap-3 px-4 md:px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search leads, deals, customers…"
              className="w-full h-9 rounded-md border bg-muted/40 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="relative h-9 w-9 grid place-items-center rounded-md border bg-background hover:bg-muted">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
