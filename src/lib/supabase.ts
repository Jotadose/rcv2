import { createClient } from "@supabase/supabase-js";

// Variables de entorno
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

// Cliente de Supabase
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Helper para verificar configuración
export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseKey);

// Tipos básicos
export interface ContactSubmission {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  project_type: string;
  location: string;
  message: string;
  budget_range?: string;
  created_at?: string;
}
