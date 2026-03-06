"use client";

import AIChatEstimator from "@/components/home/AIChatEstimator";
import { useHomePageUI } from "@/components/home/HomePageProvider";
import LeadPopupModal from "@/components/home/LeadPopupModal";

export default function HomeOverlays() {
  const { closeAIChat, showAIChat, showLeadPopup } = useHomePageUI();

  return (
    <>
      {showAIChat && <AIChatEstimator onClose={closeAIChat} />}
      {showLeadPopup && <LeadPopupModal />}
    </>
  );
}
