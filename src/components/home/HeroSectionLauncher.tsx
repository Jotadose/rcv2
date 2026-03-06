"use client";

import HeroSection from "@/components/HeroSection";
import { useHomePageUI } from "@/components/home/HomePageProvider";

export default function HeroSectionLauncher() {
  const { openAIChat } = useHomePageUI();
  return <HeroSection onOpenAIChat={openAIChat} />;
}
