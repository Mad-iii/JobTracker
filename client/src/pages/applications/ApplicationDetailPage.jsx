import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api.js";
import { ArrowLeft } from "lucide-react";

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const { data } = await api.get(`/applications/${id}`);
      return data.data;
    },
  });

  if (isLoading) return <div className="text-slate-400 text-sm">Loading...</div>;
  if (!data) return <div className="text-slate-400 text-sm">Application not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/applications" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={16} /> Back to applications
      </Link>
      <div className="card p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-white">{data.role}</h1>
        <p className="text-slate-400">{data.company}</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
          <div><span className="text-slate-500">Status: </span>{data.status}</div>
          <div><span className="text-slate-500">Location: </span>{data.location || "—"}</div>
          <div><span className="text-slate-500">Work Type: </span>{data.workType || "—"}</div>
          <div><span className="text-slate-500">Source: </span>{data.source || "—"}</div>
        </div>
        {data.notes && (
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Notes</p>
            <p className="text-slate-300 text-sm whitespace-pre-wrap">{data.notes}</p>
          </div>
        )}
      </div>
      {/* Interview section — expanded in Week 3/4 */}
      <div className="card p-6">
        <h2 className="text-base font-semibold text-white mb-3">Interviews</h2>
        <p className="text-slate-500 text-sm">Interview tracking coming in Week 3.</p>
      </div>
    </div>
  );
}
