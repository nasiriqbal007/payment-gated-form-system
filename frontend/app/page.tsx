"use client";

import { useState } from "react";
import { paymentService } from "@/services/paymentService";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await paymentService.createCheckoutSession(
        500,
        "usd",
        "http://localhost:3000/form?sessionId={CHECKOUT_SESSION_ID}",
        "http://localhost:3000/",
      );
      if (res.success && res.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("Failed to retrieve checkout URL from session.");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong while initiating payment. Please try again.";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/60 p-4 sm:p-6 flex flex-col items-center justify-center font-sans">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white/90 rounded-2xl p-6 flex flex-col items-center gap-3">
            <span className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
            <span className="text-sm font-medium text-slate-800">
              Preparing checkout...
            </span>
          </div>
        </div>
      )}
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Registration Form Access
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pay once to access and complete the registration form
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              💳
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Secure Registration Payment
            </h2>
            <p className="text-xs text-slate-500 mb-6 px-4">
              To proceed to the application form, please complete a secure
              payment via Stripe.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
                <span className="font-medium text-slate-600 text-xs">
                  Form Access Fee
                </span>
                <span className="font-bold text-slate-800">$5.00</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <span>
                  {loading
                    ? "Processing payment..."
                    : "Pay with Card (Stripe) — $5.00"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
