import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Filter, Download } from "lucide-react";
import { leads, formatCurrency, type LeadStatus } from "@/lib/crm-data";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads — Apex CRM" },
      { name: "description", content: "Track inbound and outbound leads, qualify them, and assign owners." },
      { property: "og:title", content: "Leads — Apex CRM" },
      { property: "og:description", content: "Track and qualify leads across every channel." },
    ],
  }),
  component: LeadsPage,
});

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  Contacted: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  Qualified: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  Unqualified: "bg-muted text-muted-foreground border-border",
};

function LeadsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<LeadStatus | "All">("All");

  const filtered = useMemo(
    () =>
      leads.filter((l) => {
        const matchesQ = `${l.name} ${l.company} ${l.email}`.toLowerCase().includes(q.toLowerCase());
        const matchesS = status === "All" || l.status === status;
        return matchesQ && matchesS;
      }),
    [q, status],
  );

  const totals = {
    all: leads.length,
    qualified: leads.filter((l) => l.status === "Qualified").length,
    value: leads.reduce((s, l) => s + l.value, 0),
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">{totals.all} total · {totals.qualified} qualified · {formatCurrency(totals.value)} potential</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>
          <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New lead</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {(["All", "New", "Contacted", "Qualified", "Unqualified"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                    status === s ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-72">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads…" />
              <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.email}</div>
                    </TableCell>
                    <TableCell>{l.company}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[l.status]}>{l.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{l.source}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(l.value)}</TableCell>
                    <TableCell>{l.owner}</TableCell>
                    <TableCell className="text-muted-foreground">{l.createdAt}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-10">
                      No leads match those filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
