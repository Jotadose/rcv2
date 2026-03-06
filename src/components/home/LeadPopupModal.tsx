"use client";

import { X } from "lucide-react";
import LeadForm from "@/components/home/LeadForm";
import { useHomePageUI } from "@/components/home/HomePageProvider";

export default function LeadPopupModal() {
  const { closeLeadPopup } = useHomePageUI();

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Obten tu cotizacion gratuita
          </h2>
          <button
            onClick={closeLeadPopup}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar popup"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <LeadForm variant="popup" onSuccess={closeLeadPopup} />
      </div>
    </div>
  );
}
