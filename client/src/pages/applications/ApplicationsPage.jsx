import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../lib/api.js";
import { Plus, Search, ExternalLink } from "lucide-react";
import { useState } from "react";

const STATUS_COLORS = {
  Bookmarked: "text-slate-400 bg-slate-400/10 border-slate-400/20",
  Applied: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Phone Screen": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Technical Interview": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "Final Interview": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Offer: "text-green-400 bg-green-400/10 border-green-400/20",
  Rejected: "text-red-400 bg-red-400/10 border-red-400/20",
  Withdrawn: "text-slate-500 bg-slate-500/10 border-slate-500/20",
  Ghosted: "text-slate-500 bg-slate-500/10 border-slate-500/20",
};

const STATUSES = ["All", "Bookmarked", "Applied", "Phone Screen", "Technical Interview", "Final Interview", "Offer", "Rejected"];

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["applications", search, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "All") params.set("status", statusFilter);
      const { data } = await api.get(`/applications?${params}`);
      return data;
    },
  });

  const applications = data?.data || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Applications</h1>
          <p className="text-slate-400 text-sm mt-1">
            {data?.pagination?.total ?? 0} total applications
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add application
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            className="input pl-9"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input sm:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Applied</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Source</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-12 text-slate-500">Loading...</td></tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    No applications found. Start adding your job applications!
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-surface-hover transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{app.company}</td>
                    <td className="px-5 py-4 text-slate-300">{app.role}</td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className={`badge border text-xs ${STATUS_COLORS[app.status] || ""}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 hidden lg:table-cell">
                      {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-400 hidden lg:table-cell">{app.source || "—"}</td>
                    <td className="px-5 py-4">
                      <Link to={`/applications/${app._id}`} className="text-brand-400 hover:text-brand-300">
                        <ExternalLink size={15} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
