"use client";

import { useSyncExternalStore, useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import { authService } from "@/services/authService";

const emptySubscribe = () => () => {};

export default function AdminPage() {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken");
    }
    return null;
  });

  const handleLogout = () => {
    authService.logout();
    setToken(null);
  };

  if (isServer) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <AdminLogin onLoginSuccess={(t) => setToken(t)} />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-slate-50 font-sans">
      <AdminDashboard onLogout={handleLogout} />
    </main>
  );
}
