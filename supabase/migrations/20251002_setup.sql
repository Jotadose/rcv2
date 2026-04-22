-- 🗄️ Script de Configuración Completa para Supabase
-- RC Reformas - Base de Datos

-- ================================
-- 1. TABLA: contact_submissions
-- ================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  project_type VARCHAR(100),
  location VARCHAR(255),
  message TEXT,
  budget_range VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_project_type ON contact_submissions(project_type);

-- ================================
-- 2. TABLA: chat_sessions
-- ================================
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  project_type VARCHAR(100),
  area DECIMAL(10,2),
  quality VARCHAR(50),
  budget VARCHAR(50),
  estimated_min DECIMAL(12,2),
  estimated_max DECIMAL(12,2),
  estimated_duration VARCHAR(50),
  status VARCHAR(50) DEFAULT 'incomplete',
  messages JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_email ON chat_sessions(email);

-- ================================
-- 3. FUNCIÓN PARA updated_at AUTOMÁTICO
-- ================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ================================
-- 4. TRIGGERS
-- ================================
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON chat_sessions;
CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ================================

-- Habilitar RLS en las tablas
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas para contact_submissions
DROP POLICY IF EXISTS "Allow public insert contact_submissions" ON contact_submissions;
CREATE POLICY "Allow public insert contact_submissions" ON contact_submissions
FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read contact_submissions" ON contact_submissions;
CREATE POLICY "Allow authenticated read contact_submissions" ON contact_submissions
FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para chat_sessions
DROP POLICY IF EXISTS "Allow public insert chat_sessions" ON chat_sessions;
CREATE POLICY "Allow public insert chat_sessions" ON chat_sessions
FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update chat_sessions" ON chat_sessions;
CREATE POLICY "Allow public update chat_sessions" ON chat_sessions
FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow authenticated read chat_sessions" ON chat_sessions;
CREATE POLICY "Allow authenticated read chat_sessions" ON chat_sessions
FOR SELECT USING (auth.role() = 'authenticated');

-- ================================
-- 6. DATOS DE EJEMPLO (OPCIONAL)
-- ================================

-- Insertar algunos tipos de proyecto para referencia
INSERT INTO contact_submissions (name, email, phone, project_type, location, message) 
VALUES 
  ('Cliente Demo', 'demo@rcreformas.cl', '+56951234567', 'Remodelación', 'Coquimbo', 'Proyecto de ejemplo para testing')
ON CONFLICT DO NOTHING;

-- ================================
-- 7. VERIFICACIÓN
-- ================================

-- Verificar que las tablas se crearon correctamente
SELECT 
  schemaname,
  tablename,
  tableowner,
  hasindexes,
  hasrules,
  hastriggers
FROM pg_tables 
WHERE tablename IN ('contact_submissions', 'chat_sessions');

-- Verificar políticas RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('contact_submissions', 'chat_sessions');

-- ================================
-- 8. FUNCIONES AUXILIARES
-- ================================

-- Función para obtener estadísticas de contactos
CREATE OR REPLACE FUNCTION get_contact_stats()
RETURNS TABLE (
  total_contacts BIGINT,
  contacts_today BIGINT,
  contacts_this_week BIGINT,
  contacts_this_month BIGINT,
  most_common_project_type TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM contact_submissions) as total_contacts,
    (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= CURRENT_DATE) as contacts_today,
    (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as contacts_this_week,
    (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as contacts_this_month,
    (SELECT project_type FROM contact_submissions 
     WHERE project_type IS NOT NULL 
     GROUP BY project_type 
     ORDER BY COUNT(*) DESC 
     LIMIT 1) as most_common_project_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener estadísticas de chat
CREATE OR REPLACE FUNCTION get_chat_stats()
RETURNS TABLE (
  total_sessions BIGINT,
  completed_sessions BIGINT,
  conversion_rate NUMERIC,
  avg_estimated_min NUMERIC,
  avg_estimated_max NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM chat_sessions) as total_sessions,
    (SELECT COUNT(*) FROM chat_sessions WHERE status = 'complete') as completed_sessions,
    (SELECT ROUND(
      (COUNT(*) FILTER (WHERE status = 'complete')::NUMERIC / 
       GREATEST(COUNT(*), 1)::NUMERIC) * 100, 2
    ) FROM chat_sessions) as conversion_rate,
    (SELECT ROUND(AVG(estimated_min), 0) FROM chat_sessions WHERE estimated_min IS NOT NULL) as avg_estimated_min,
    (SELECT ROUND(AVG(estimated_max), 0) FROM chat_sessions WHERE estimated_max IS NOT NULL) as avg_estimated_max;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================
-- 🎉 CONFIGURACIÓN COMPLETADA
-- ================================

-- Para verificar que todo funciona:
-- SELECT * FROM get_contact_stats();
-- SELECT * FROM get_chat_stats();

NOTIFY setup_complete, 'RC Reformas database setup completed successfully!';
