"use client";

import { useState } from "react";
import useSWR from "swr";
import { formService, FormRecord } from "@/services/formService";

interface AdminDashboardProps {
  onLogout: () => void;
  adminName?: string;
}

export default function AdminDashboard({
  onLogout,
  adminName = "Admin",
}: AdminDashboardProps) {
  const {
    data: forms = [],
    isLoading,
    mutate,
  } = useSWR<FormRecord[]>("/admin/forms", formService.listForms);
  const [selectedForm, setSelectedForm] = useState<FormRecord | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const response = await formService.deleteForm(id);
      if (response && response.message) {
        setNotification(response.message);
        setTimeout(() => setNotification(null), 4000);
      }
      mutate(
        forms.filter((f) => f.id !== id),
        false,
      );
      if (selectedForm?.id === id) {
        setSelectedForm(null);
      }
    } catch (err) {
      console.error("Failed to delete form:", err);
      setNotification("Failed to delete form entry.");
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const detailsList = selectedForm
    ? [
        { label: "Full Name", value: selectedForm.full_name },
        { label: "Date of Birth", value: selectedForm.date_of_birth },
        { label: "Gender", value: selectedForm.gender },
        { label: "Blood Group", value: selectedForm.blood_group },
        { label: "Parent Name", value: selectedForm.parent_name },
        { label: "Phone Number", value: selectedForm.phone_number },
        { label: "Email", value: selectedForm.email },
        { label: "Occupation", value: selectedForm.occupation },
        { label: "Grade", value: selectedForm.grade },
        { label: "Previous School", value: selectedForm.previous_school },
        { label: "Address", value: selectedForm.address },
      ]
    : [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-slate-50 overflow-x-hidden font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <span className="font-bold text-sm text-slate-800">Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold"
        >
          {mobileMenuOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3 shadow-md z-10">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">
                {adminName}
              </p>
              <p className="text-[10px] text-slate-400">Administrator</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full px-3 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-xl text-center"
          >
            Logout
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r border-slate-200/80 flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-slate-100">
            <h1 className="text-base font-bold text-slate-800">Admin Portal</h1>
            <p className="text-[11px] text-slate-400">Form Management System</p>
          </div>

          <div className="p-3">
            <nav className="space-y-1">
              <div className="px-3 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-semibold flex items-center gap-2">
                <span>📊</span>
                <span>Dashboard</span>
              </div>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {adminName}
              </p>
              <p className="text-[10px] text-slate-400">Administrator</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl transition-colors border border-red-100 text-center cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:h-full">
        <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Form Submissions
            </h2>
            <p className="text-xs text-slate-500">
              Manage and view full details of student submissions
            </p>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {notification && (
          <div className="fixed top-5 right-5 z-50 animate-bounce bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{notification}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-slate-400 hover:text-white font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Table*/}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Loading form submissions...
              </div>
            ) : forms.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No form submissions found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse min-w-150">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-semibold">
                      <th className="py-3 px-4">Form ID</th>
                      <th className="py-3 px-4">Full Name</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Grade</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {forms.map((form) => (
                      <tr
                        key={form.id}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono text-slate-500 text-[11px] truncate max-w-30">
                          {form.id}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {form.full_name || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                              form.status === "submitted"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {form.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {form.grade || "-"}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedForm(form)}
                            className="text-blue-600 hover:text-blue-800 font-semibold px-2.5 py-1 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelete(form.id)}
                            className="text-red-500 hover:text-red-700 font-semibold px-2.5 py-1 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 sm:p-6 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800">
                  {selectedForm.full_name || "Form Details"}
                </h3>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    selectedForm.status === "submitted"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {selectedForm.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedForm(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {detailsList.map((item) => (
                <div
                  key={item.label}
                  className="py-2.5 flex items-center justify-between"
                >
                  <span className="text-slate-500 font-medium">
                    {item.label}
                  </span>
                  <span className="text-slate-800 font-semibold text-right max-w-50 truncate">
                    {item.value || (
                      <span className="text-slate-300 font-normal">—</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedForm(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
