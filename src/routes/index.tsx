import { createFileRoute } from "@tanstack/react-router";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { ArrowUpRight, TrendingUp, DollarSign, Users, Target } from "lucide-react";
import {
  monthlyRevenue, sourceBreakdown, deals, teamLeaderboard, activities,
  formatCurrency, dealStages,
} from "@/lib/crm-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Apex CRM" },
      { name: "description", content: "Pipeline coverage, revenue trend, win rate and team performance at a glance." },
      { property: "og:title", content: "Dashboard — Apex CRM" },
      { property: "og:description", content: "Pipeline coverage, revenue trend, win rate and team performance." },
    ],
  }),
  component: Dashboard,
});

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function Dashboard() {
  const open = deals.filter((d) => d.stage !== "Won" && d.stage !== "Lost");
  const pipeline = open.reduce((s, d) => s + d.value, 0);
  const won = deals.filter((d) => d.stage === "Won").reduce((s, d) => s + d.value, 0);
  const winRate = Math.round(
    (deals.filter((d) => d.stage === "Won").length /
      deals.filter((d) => d.stage === "Won" || d.stage === "Lost").length) * 100,
  );

  const stageData = dealStages.map((s) => ({
    stage: s,
    value: deals.filter((d) => d.stage === s).reduce((acc, d) => acc + d.value, 0),
  }));

  const kpis = [
    { label: "Pipeline value", value: formatCurrency(pipeline), delta: "+12.4%", icon: TrendingUp },
    { label: "Won this quarter", value: formatCurrency(won), delta: "+8.1%", icon: DollarSign },
    { label: "Win rate", value: `${winRate}%`, delta: "+3.2 pts", icon: Target },
    { label: "Active customers", value: "248", delta: "+14", icon: Users },
  ];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sales overview</h1>
          <p className="text-sm text-muted-foreground">Q2 2026 — performance across all regions</p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live data
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>{k.label}</CardDescription>
                <k.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{k.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <ArrowUpRight className="h-3 w-3" /> {k.delta}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">vs last quarter</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue trend</CardTitle>
            <CardDescription>Closed-won revenue, last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} formatter={(v: number) => formatCurrency(v)} />
                <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead sources</CardTitle>
            <CardDescription>Distribution of new leads this month</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceBreakdown} dataKey="value" nameKey="source" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {sourceBreakdown.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pipeline by stage</CardTitle>
            <CardDescription>Total value of open and closed deals</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="stage" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="value" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team leaderboard</CardTitle>
            <CardDescription>Quota attainment this quarter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamLeaderboard.map((m) => (
              <div key={m.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{Math.round(m.quota * 100)}%</div>
                    <div className="text-xs text-muted-foreground">{formatCurrency(m.pipeline)}</div>
                  </div>
                </div>
                <Progress value={Math.min(m.quota * 100, 120)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>Latest interactions across accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {activities.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Badge variant="outline">{a.type}</Badge>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{a.subject}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.relatedTo} · {a.owner}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(a.date).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
