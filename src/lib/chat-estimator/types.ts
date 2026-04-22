export type ChatMessage = {
  options?: string[];
  sender: "assistant" | "bot" | "user";
  text: string;
  timestamp?: Date;
};

export type ConversationStep =
  | "welcome"
  | "area"
  | "quality"
  | "budget"
  | "name"
  | "phone";

export type QuoteData = {
  area: number | null;
  budget: string | null;
  name: string | null;
  phone: string | null;
  projectType: string | null;
  quality: string | null;
};

export type ConversationFlowEntry = {
  message: string;
  next: ConversationStep | "final";
  options?: string[];
  validator?: (input: string) => number | string | null;
};

export type Estimate = {
  duration: string;
  max: number;
  min: number;
};
