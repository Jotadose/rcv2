"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type HomePageUIContextValue = {
  closeAIChat: () => void;
  closeLeadPopup: () => void;
  openAIChat: () => void;
  showAIChat: boolean;
  showLeadPopup: boolean;
};

const HomePageUIContext = createContext<HomePageUIContextValue | null>(null);

export function HomePageProvider({ children }: { children: ReactNode }) {
  const [showAIChat, setShowAIChat] = useState(false);
  const [showLeadPopup, setShowLeadPopup] = useState(false);

  useEffect(() => {
    if (showAIChat) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowLeadPopup(true);
    }, 30000);

    return () => window.clearTimeout(timer);
  }, [showAIChat]);

  return (
    <HomePageUIContext.Provider
      value={{
        closeAIChat: () => setShowAIChat(false),
        closeLeadPopup: () => setShowLeadPopup(false),
        openAIChat: () => {
          setShowLeadPopup(false);
          setShowAIChat(true);
        },
        showAIChat,
        showLeadPopup,
      }}
    >
      {children}
    </HomePageUIContext.Provider>
  );
}

export function useHomePageUI() {
  const context = useContext(HomePageUIContext);
  if (!context) {
    throw new Error("useHomePageUI must be used inside HomePageProvider");
  }

  return context;
}
