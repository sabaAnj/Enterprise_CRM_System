import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Users2, StickyNote, CheckSquare, Plus } from "lucide-react";
import { activities, type ActivityType } from "@/lib/crm-data";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities — Apex CRM" },
      { name: "description", content: "Log calls, emails, meetings and tasks. See the entire account timeline in one place." },
      { property: "og:title", content: "Activities — Apex CRM" },
      { property: "og:description", content: "Calls, emails, meetings and tasks across every account." },
    ],
  }),
  component: ActivitiesPage,
});

const icons: Record<ActivityType, typeof Mail> = {
  Email: Mail,
  Call: Phone,
  Meeting: Users2,
  Note: StickyNote,
  Task: CheckSquare,
};

const typeStyles: Record<ActivityType, string> = {
  Email: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  Call: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Meeting: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  Note: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Task: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
};

function ActivitiesPage() {
  const sorted = [...activities].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const upcoming = sorted.filter((a) => !a.completed);
  const done = sorted.filter((a) => a.completed);

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Activities</h1>
          <p className="text-sm text-muted-foreground">{upcoming.length} upcoming · {done.length} completed</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Log activity</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
            <CardDescription>Open tasks and scheduled touchpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <Timeline items={upcoming} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recently completed</CardTitle>
            <CardDescription>What the team logged this week</CardDescription>
          </CardHeader>
          <CardContent>
            <Timeline items={done} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Timeline({ items }: { items: typeof activities }) {
  if (items.length === 0) {
    return <div className="text-sm text-muted-foreground py-6 text-center">Nothing here yet.</div>;
  }
  return (
    <ul className="space-y-4">
      {items.map((a) => {
        const Icon = icons[a.type];
        return (
          <li key={a.id} className="flex gap-3">
            <div className={`h-9 w-9 rounded-full grid place-items-center shrink-0 ${typeStyles[a.type]}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-medium truncate">{a.subject}</div>
                <Badge variant="outline" className="text-[10px]">{a.type}</Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {a.relatedTo} · {a.owner} · {new Date(a.date).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
