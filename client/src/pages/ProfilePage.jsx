import { useAuth } from "../hooks/useAuth.jsx";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-white">Profile</h1>
      <div className="card p-6 space-y-3">
        <p className="text-white font-medium">{user?.name}</p>
        <p className="text-slate-400 text-sm">{user?.email}</p>
        <p className="text-slate-500 text-sm">Profile editor coming in Week 4.</p>
      </div>
    </div>
  );
}
