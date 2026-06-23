# Apex CRM — Enterprise CRM System

A frontend demo of an Enterprise CRM built with **React 19 + TanStack Start**, **Tailwind CSS v4**, **shadcn/ui**, and **Recharts**. All data is mocked for demonstration purposes — no backend required.

> Built as Project #2 (Enterprise CRM System) for the Codec Technologies internship assignment.

## ✨ Features

### 📊 Dashboard (`/`)
- KPI cards: Total Revenue, Active Deals, New Leads, Win Rate
- Revenue trend area chart (12-month view)
- Lead source distribution pie chart
- Sales pipeline bar chart by stage
- Team performance leaderboard

### 👥 Leads Management (`/leads`)
- Searchable & filterable lead table
- Lead status tracking: New, Contacted, Qualified, Lost
- Lead scoring and source attribution
- Owner assignment

### 💼 Sales Pipeline (`/deals`)
- Kanban board across stages: Lead → Qualified → Proposal → Negotiation → Won
- Deal value, company, and probability per card
- Visual pipeline health at a glance

### 🏢 Customer Accounts (`/customers`)
- Account cards with industry, contacts, and tier
- Lifetime Value (LTV) tracking
- Health status indicators

### 📅 Activity Timeline (`/activities`)
- Unified timeline of calls, emails, meetings, and tasks
- Linked to leads / deals / customers
- Owner and timestamp metadata

### 🎨 UX
- Persistent sidebar navigation (shadcn `Sidebar`)
- Fully responsive layout
- Accessible components (Radix primitives)
- Consistent semantic design tokens (no hardcoded colors)

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Framework | TanStack Start v1 (React 19, SSR-ready) |
| Build Tool | Vite 7 |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Radix UI |
| Charts | Recharts |
| Icons | lucide-react |
| Language | TypeScript (strict) |

## 📁 Project Structure

```
src/
├── components/
│   ├── app-shell.tsx        # Sidebar + layout wrapper
│   └── ui/                  # shadcn primitives
├── lib/
│   └── crm-data.ts          # Mock data + TypeScript interfaces
└── routes/
    ├── __root.tsx           # Root layout
    ├── index.tsx            # Dashboard
    ├── leads.tsx            # Leads table
    ├── deals.tsx            # Kanban pipeline
    ├── customers.tsx        # Customer accounts
    └── activities.tsx       # Activity timeline
```

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build
```

Open <http://localhost:8080> in your browser.

## 📸 Screens

- **Dashboard** — executive overview with KPIs and charts
- **Leads** — qualify and track inbound prospects
- **Pipeline** — drag-friendly Kanban for deal stages
- **Customers** — account 360° view
- **Activities** — chronological CRM history

## 📝 Notes

This is a **frontend-only demo**. All data lives in `src/lib/crm-data.ts`. To make it production-ready you'd plug in:
- Lovable Cloud (Postgres + Auth + RLS) for persistence
- Server functions for mutations
- Real-time subscriptions for live updates

## 📄 License

MIT — built for educational/internship purposes.
