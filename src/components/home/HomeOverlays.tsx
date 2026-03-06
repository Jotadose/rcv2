"use client";

import dynamic from "next/dynamic";
import { useHomePageUI } from "@/components/home/HomePageProvider";

const AIChatEstimator = dynamic(() => import("@/components/home/AIChatEstimator"));
const LeadPopupModal = dynamic(() => import("@/components/home/LeadPopupModal"));

export default function HomeOverlays() {
  const { closeAIChat, showAIChat, showLeadPopup } = useHomePageUI();

  return (
    <>
      {showAIChat && <AIChatEstimator onClose={closeAIChat} />}
      {showLeadPopup && <LeadPopupModal />}
    </>
  );
}
