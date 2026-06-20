import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { deals, dealStages, formatCurrency, type DealStage } from "@/lib/crm-data";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Pipeline — Apex CRM" },
      { name: "description", content: "Visualize every open deal across qualification, proposal, negotiation, and close." },
      { property: "og:title", content: "Pipeline — Apex CRM" },
      { property: "og:description", content: "Visual sales pipeline by stage with deal value forecasting." },
    ],
  }),
  component: DealsPage,
});

const stageAccent: Record<DealStage, string> = {
  Lead: "bg-slate-400",
  Qualified: "bg-blue-500",
  Proposal: "bg-violet-500",
  Negotiation: "bg-amber-500",
  Won: "bg-emerald-500",
  Lost: "bg-rose-500",
};

function DealsPage() {
  const totals = dealStages.map((s) => ({
    stage: s,
    value: deals.filter((d) => d.stage === s).reduce((acc, d) => acc + d.value, 0),
    count: deals.filter((d) => d.stage === s).length,
  }));

  return (
    <div className="space-y-6 max-w-[1600px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sales pipeline</h1>
          <p className="text-sm text-muted-foreground">Drag-and-drop ready · {deals.length} active deals</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New deal</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {totals.map((t) => (
          <Card key={t.stage}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${stageAccent[t.stage]}`} />
                <CardDescription className="text-xs">{t.stage}</CardDescription>
              </div>
              <CardTitle className="text-lg tabular-nums">{formatCurrency(t.value)}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">{t.count} deals</CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        {dealStages.map((stage) => {
          const items = deals.filter((d) => d.stage === stage);
          return (
            <div key={stage} className="flex flex-col rounded-lg border bg-card min-h-[400px]">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${stageAccent[stage]}`} />
                  <h2 className="text-sm font-semibold">{stage}</h2>
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">{items.length}</Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
              <div className="p-2 space-y-2 flex-1">
                {items.map((d) => (
                  <div key={d.id} className="rounded-md border bg-background p-3 hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="text-sm font-medium leading-snug">{d.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{d.company}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold tabular-nums">{formatCurrency(d.value)}</span>
                      <Badge variant="outline" className="text-[10px] h-5">{d.probability}%</Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Close {d.closeDate.slice(5)}</span>
                      <span>{d.owner.split(" ").map((n) => n[0]).join("")}</span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="text-xs text-muted-foreground text-center py-8">No deals</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
