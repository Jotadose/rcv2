// Este archivo se mantiene para compatibilidad, pero ya no usa Supabase.
// Toda la funcionalidad de contacto ahora usa Formspree directamente.

// Tipos básicos para compatibilidad con el AI chat
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

// Funciones stub para compatibilidad
export const supabase = null;
export const isSupabaseConfigured = () => false;
