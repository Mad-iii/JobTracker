import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth.jsx";
import api from "../lib/api.js";
import { Briefcase, TrendingUp, CalendarCheck, Star, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_COLORS = {
  Bookmarked: "text-slate-400 bg-slate-400/10",
  Applied: "text-blue-400 bg-blue-400/10",
  "Phone Screen": "text-yellow-400 bg-yellow-400/10",
  "Technical Interview": "text-orange-400 bg-orange-400/10",
  "Final Interview": "text-purple-400 bg-purple-400/10",
  Offer: "text-green-400 bg-green-400/10",
  Rejected: "text-red-400 bg-red-400/10",
  Withdrawn: "text-slate-500 bg-slate-500/10",
  Ghosted: "text-slate-500 bg-slate-500/10",
};

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["application-stats"],
    queryFn: async () => {
      const { data } = await api.get("/applications/stats");
      return data.data;
    },
  });

  const { data: recent } = useQuery({
    queryKey: ["recent-applications"],
    queryFn: async () => {
      const { data } = await api.get("/applications?limit=5&sort=-updatedAt");
      return data.data;
    },
  });

  const STAT_CARDS = [
    { label: "Total Applications", value: stats?.total ?? "—", icon: Briefcase, color: "text-brand-400" },
    { label: "In Progress",        value: stats?.interviews ?? "—", icon: TrendingUp, color: "text-yellow-400" },
    { label: "Offers",             value: stats?.offers ?? "—", icon: Star, color: "text-green-400" },
    { label: "Response Rate",      value: stats ? `${stats.responseRate}%` : "—", icon: CalendarCheck, color: "text-purple-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Good {new Date().getHours() < 12 ? "morning" : "afternoon"}, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-400 mt-1">Here's where your job search stands today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm text-slate-400">{label}</p>
              <Icon size={18} className={color} />
            </div>
            <p className="text-3xl font-semibold text-white">{isLoading ? "—" : value}</p>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      {stats?.statusBreakdown && stats.statusBreakdown.length > 0 && (
        <div className="card p-6">
          <h2 className="text-base font-semibold text-white mb-4">Applications by Status</h2>
          <div className="flex flex-wrap gap-3">
            {stats.statusBreakdown.map(({ _id: status, count }) => (
              <div key={status} className={`badge px-3 py-1.5 text-sm ${STATUS_COLORS[status] || "text-slate-400 bg-slate-400/10"}`}>
                {status} · {count}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent applications */}
      <div className="card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
          <h2 className="text-base font-semibold text-white">Recent Applications</h2>
          <Link to="/applications" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-surface-border">
          {!recent || recent.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-500 text-sm">
              No applications yet.{" "}
              <Link to="/applications" className="text-brand-400 hover:underline">Add your first one →</Link>
            </div>
          ) : (
            recent.map((app) => (
              <Link
                key={app._id}
                to={`/applications/${app._id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-surface-hover transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-white">{app.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{app.company}</p>
                </div>
                <span className={`badge text-xs ${STATUS_COLORS[app.status] || ""}`}>{app.status}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
