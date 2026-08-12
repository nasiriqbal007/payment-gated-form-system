"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentService } from "@/services/paymentService";
import PublicForm from "@/components/PublicForm";

function FormPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("sessionId");

  const [isVerifying, setIsVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!sessionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrorMsg("Missing session ID. Please complete payment first.");
      setIsVerifying(false);
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }

    let active = true;

    paymentService
      .verifyPayment(sessionId)
      .then((res) => {
        if (active) {
          if (res.success && res.data.paid) {
            setVerified(true);
          } else {
            setErrorMsg(
              "Payment validation failed. Please check with support.",
            );
          }
          setIsVerifying(false);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          const msg =
            err instanceof Error
              ? err.message
              : "Unable to verify payment status. Please try again.";
          setErrorMsg(msg);
          setIsVerifying(false);
        }
      });

    return () => {
      active = false;
    };
  }, [sessionId, router]);

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md text-center">
        <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Verifying Payment...
        </h2>
        <p className="text-xs text-slate-500">
          We are checking your payment status with Stripe.
        </p>
      </div>
    );
  }

  if (errorMsg || !verified) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md text-center">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
          !
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Payment Unverified
        </h2>
        <p className="text-xs text-red-600 mb-4">{errorMsg}</p>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Go back to Home
        </button>
      </div>
    );
  }

  return <PublicForm />;
}

export default function FormPage() {
  return (
    <main className="min-h-screen bg-slate-50/60 p-4 sm:p-6 flex flex-col items-center justify-center font-sans">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md text-center">
            <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-4" />
            <h2 className="text-lg font-bold text-slate-800 mb-1">
              Loading page...
            </h2>
          </div>
        }
      >
        <FormPageContent />
      </Suspense>
    </main>
  );
}
