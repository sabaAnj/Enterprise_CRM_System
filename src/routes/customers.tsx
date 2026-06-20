import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Mail, Phone, Plus } from "lucide-react";
import { customers, formatCurrency } from "@/lib/crm-data";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Apex CRM" },
      { name: "description", content: "Manage every active and historical customer account, with lifetime value and contact details." },
      { property: "og:title", content: "Customers — Apex CRM" },
      { property: "og:description", content: "Customer accounts, lifetime value and account health." },
    ],
  }),
  component: CustomersPage,
});

const statusColor = {
  Active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  Inactive: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  Churned: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
} as const;

function avatar(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function CustomersPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => customers.filter((c) => `${c.name} ${c.company} ${c.industry}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground">
            {customers.length} accounts · {formatCurrency(customers.reduce((s, c) => s + c.lifetimeValue, 0))} total LTV
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers…" className="sm:w-64" />
          <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
              <div className="h-11 w-11 rounded-full bg-primary/15 text-primary grid place-items-center font-semibold">
                {avatar(c.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{c.company}</div>
                <div className="text-xs text-muted-foreground truncate">{c.name} · {c.industry}</div>
              </div>
              <Badge variant="outline" className={statusColor[c.status]}>{c.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-md bg-muted/50 p-2.5">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Lifetime value</div>
                  <div className="font-semibold tabular-nums">{formatCurrency(c.lifetimeValue)}</div>
                </div>
                <div className="rounded-md bg-muted/50 p-2.5">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Customer since</div>
                  <div className="font-semibold">{c.since}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="h-3.5 w-3.5" /> {c.email}</a>
                <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {c.phone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
