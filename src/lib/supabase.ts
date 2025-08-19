import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Crear cliente de Supabase solo si las variables están disponibles
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Helper para verificar si Supabase está disponible
export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseKey);

// Types para la base de datos
export interface ContactSubmission {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  project_type: string;
  location: string;
  message: string;
  budget_range?: string;
  preferred_contact?: "phone" | "whatsapp" | "email";
  created_at?: string;
  status?: "new" | "contacted" | "quoted" | "closed";
}

export interface ChatSession {
  id?: string;
  session_id: string;
  name?: string;
  phone?: string;
  project_type?: string;
  area?: number;
  quality?: string;
  estimated_min?: number;
  estimated_max?: number;
  messages: any[];
  created_at?: string;
  completed?: boolean;
}
