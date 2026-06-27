import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  LayoutDashboard, Briefcase, CalendarCheck, User, LogOut,
  Sparkles, Menu, X,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const NAV = [
  { to: "/dashboard",    icon: LayoutDashboard, label: "Dashboard"    },
  { to: "/applications", icon: Briefcase,        label: "Applications" },
  { to: "/interviews",   icon: CalendarCheck,    label: "Interviews"   },
  { to: "/profile",      icon: User,             label: "Profile"      },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  const Sidebar = ({ mobile = false }) => (
    <aside className={clsx(
      "flex flex-col h-full bg-surface-card border-r border-surface-border",
      mobile ? "w-64" : "w-64 hidden lg:flex"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-surface-border">
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>
        <span className="font-semibold text-white text-lg tracking-tight">JobTracker</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
              isActive
                ? "bg-brand-600/20 text-brand-400"
                : "text-slate-400 hover:text-slate-200 hover:bg-surface-hover"
            )}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-surface-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-brand-600/30 flex items-center justify-center text-brand-400 font-semibold text-sm">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 z-50">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-surface-border bg-surface-card">
          <button onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
          <span className="font-semibold text-white">JobTracker</span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
