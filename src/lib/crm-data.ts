export type LeadStatus = "New" | "Contacted" | "Qualified" | "Unqualified";
export type DealStage = "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  value: number;
  owner: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  stage: DealStage;
  value: number;
  probability: number;
  closeDate: string;
  owner: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  lifetimeValue: number;
  status: "Active" | "Inactive" | "Churned";
  since: string;
}

export type ActivityType = "Email" | "Call" | "Meeting" | "Note" | "Task";

export interface Activity {
  id: string;
  type: ActivityType;
  subject: string;
  relatedTo: string;
  owner: string;
  date: string;
  completed: boolean;
}

export const leads: Lead[] = [
  { id: "L-1001", name: "Aarav Mehta", company: "Northwind Logistics", email: "aarav@northwind.io", phone: "+91 98201 33421", source: "Website", status: "New", value: 12000, owner: "Priya Shah", createdAt: "2026-06-12" },
  { id: "L-1002", name: "Sophia Lee", company: "Helix BioTech", email: "sophia@helixbio.com", phone: "+1 415 555 0142", source: "Referral", status: "Contacted", value: 48000, owner: "Daniel Cruz", createdAt: "2026-06-10" },
  { id: "L-1003", name: "Marcus Bauer", company: "Bauer & Söhne", email: "m.bauer@bauer.de", phone: "+49 30 901820", source: "LinkedIn", status: "Qualified", value: 95000, owner: "Priya Shah", createdAt: "2026-06-08" },
  { id: "L-1004", name: "Elena Rossi", company: "Rossi Marittima", email: "elena@rossimar.it", phone: "+39 010 555 22", source: "Event", status: "Qualified", value: 26000, owner: "Hannah Kim", createdAt: "2026-06-05" },
  { id: "L-1005", name: "Jordan Blake", company: "Blake Capital", email: "jordan@blakecap.com", phone: "+1 212 555 7733", source: "Cold Email", status: "Unqualified", value: 4000, owner: "Daniel Cruz", createdAt: "2026-06-04" },
  { id: "L-1006", name: "Yuki Tanaka", company: "Sumi Robotics", email: "yuki@sumirobo.jp", phone: "+81 3 5555 2200", source: "Website", status: "Contacted", value: 72000, owner: "Hannah Kim", createdAt: "2026-06-02" },
  { id: "L-1007", name: "Fatima Noor", company: "Noor Apparel", email: "fatima@nooraparel.ae", phone: "+971 4 555 9911", source: "Referral", status: "New", value: 18000, owner: "Priya Shah", createdAt: "2026-05-30" },
  { id: "L-1008", name: "Ben Carter", company: "Carter Foods", email: "ben@carterfoods.co", phone: "+44 20 7946 0182", source: "LinkedIn", status: "Qualified", value: 36000, owner: "Daniel Cruz", createdAt: "2026-05-28" },
];

export const deals: Deal[] = [
  { id: "D-2001", title: "Annual Platform License", company: "Helix BioTech", contact: "Sophia Lee", stage: "Proposal", value: 84000, probability: 60, closeDate: "2026-07-10", owner: "Daniel Cruz" },
  { id: "D-2002", title: "Fleet Optimization Module", company: "Northwind Logistics", contact: "Aarav Mehta", stage: "Qualified", value: 32000, probability: 35, closeDate: "2026-07-22", owner: "Priya Shah" },
  { id: "D-2003", title: "European Expansion Suite", company: "Bauer & Söhne", contact: "Marcus Bauer", stage: "Negotiation", value: 145000, probability: 75, closeDate: "2026-06-30", owner: "Priya Shah" },
  { id: "D-2004", title: "Pilot Engagement", company: "Sumi Robotics", contact: "Yuki Tanaka", stage: "Lead", value: 18000, probability: 15, closeDate: "2026-08-15", owner: "Hannah Kim" },
  { id: "D-2005", title: "Maritime Analytics", company: "Rossi Marittima", contact: "Elena Rossi", stage: "Proposal", value: 56000, probability: 55, closeDate: "2026-07-05", owner: "Hannah Kim" },
  { id: "D-2006", title: "Retail Rollout", company: "Noor Apparel", contact: "Fatima Noor", stage: "Qualified", value: 41000, probability: 40, closeDate: "2026-07-28", owner: "Priya Shah" },
  { id: "D-2007", title: "Renewal — Enterprise", company: "Carter Foods", contact: "Ben Carter", stage: "Won", value: 96000, probability: 100, closeDate: "2026-06-15", owner: "Daniel Cruz" },
  { id: "D-2008", title: "Trial → Paid Conversion", company: "Blake Capital", contact: "Jordan Blake", stage: "Lost", value: 12000, probability: 0, closeDate: "2026-06-10", owner: "Daniel Cruz" },
  { id: "D-2009", title: "Add-on: Audit Logs", company: "Helix BioTech", contact: "Sophia Lee", stage: "Negotiation", value: 22000, probability: 70, closeDate: "2026-07-02", owner: "Daniel Cruz" },
];

export const customers: Customer[] = [
  { id: "C-3001", name: "Ben Carter", company: "Carter Foods", email: "ben@carterfoods.co", phone: "+44 20 7946 0182", industry: "Food & Bev", lifetimeValue: 312000, status: "Active", since: "2023-02-11" },
  { id: "C-3002", name: "Ananya Iyer", company: "Iyer Textiles", email: "ananya@iyertex.in", phone: "+91 80 4112 8800", industry: "Manufacturing", lifetimeValue: 188000, status: "Active", since: "2024-09-04" },
  { id: "C-3003", name: "Rafael Souza", company: "Souza Energia", email: "rafa@souzaenergia.br", phone: "+55 11 4002 8922", industry: "Energy", lifetimeValue: 540000, status: "Active", since: "2022-05-19" },
  { id: "C-3004", name: "Maya Goldberg", company: "Atlas Insure", email: "maya@atlasinsure.com", phone: "+1 646 555 0119", industry: "Insurance", lifetimeValue: 96000, status: "Inactive", since: "2024-01-22" },
  { id: "C-3005", name: "Linus Ek", company: "Ek Nordic AB", email: "linus@eknordic.se", phone: "+46 8 555 1900", industry: "SaaS", lifetimeValue: 224000, status: "Active", since: "2023-11-30" },
  { id: "C-3006", name: "Hiro Sato", company: "Sato Pharma", email: "hiro@satopharma.jp", phone: "+81 3 5555 1188", industry: "Healthcare", lifetimeValue: 71000, status: "Churned", since: "2022-08-14" },
];

export const activities: Activity[] = [
  { id: "A-4001", type: "Call", subject: "Discovery call with Sophia Lee", relatedTo: "Helix BioTech", owner: "Daniel Cruz", date: "2026-06-19T10:30:00", completed: true },
  { id: "A-4002", type: "Email", subject: "Sent proposal v2", relatedTo: "Bauer & Söhne", owner: "Priya Shah", date: "2026-06-19T14:05:00", completed: true },
  { id: "A-4003", type: "Meeting", subject: "Onsite demo", relatedTo: "Northwind Logistics", owner: "Priya Shah", date: "2026-06-21T09:00:00", completed: false },
  { id: "A-4004", type: "Task", subject: "Prepare ROI calculator", relatedTo: "Rossi Marittima", owner: "Hannah Kim", date: "2026-06-20T17:00:00", completed: false },
  { id: "A-4005", type: "Note", subject: "Procurement timeline shifts to Q3", relatedTo: "Sumi Robotics", owner: "Hannah Kim", date: "2026-06-18T16:45:00", completed: true },
  { id: "A-4006", type: "Call", subject: "Renewal confirmation", relatedTo: "Carter Foods", owner: "Daniel Cruz", date: "2026-06-15T11:20:00", completed: true },
  { id: "A-4007", type: "Email", subject: "Follow-up after webinar", relatedTo: "Noor Apparel", owner: "Priya Shah", date: "2026-06-20T08:15:00", completed: false },
];

export const dealStages: DealStage[] = ["Lead", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

export const monthlyRevenue = [
  { month: "Jan", revenue: 78000, deals: 9 },
  { month: "Feb", revenue: 92000, deals: 11 },
  { month: "Mar", revenue: 84000, deals: 10 },
  { month: "Apr", revenue: 118000, deals: 14 },
  { month: "May", revenue: 142000, deals: 16 },
  { month: "Jun", revenue: 167000, deals: 18 },
];

export const sourceBreakdown = [
  { source: "Website", value: 38 },
  { source: "Referral", value: 24 },
  { source: "LinkedIn", value: 20 },
  { source: "Event", value: 12 },
  { source: "Cold Email", value: 6 },
];

export const teamLeaderboard = [
  { name: "Priya Shah", role: "AE — APAC", won: 12, pipeline: 218000, quota: 0.92 },
  { name: "Daniel Cruz", role: "AE — Americas", won: 14, pipeline: 196000, quota: 1.08 },
  { name: "Hannah Kim", role: "AE — EMEA", won: 9, pipeline: 142000, quota: 0.71 },
  { name: "Omar Idris", role: "SDR", won: 0, pipeline: 88000, quota: 0.83 },
];

export function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
