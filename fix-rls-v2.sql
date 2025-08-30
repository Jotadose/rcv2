-- Fix para RLS V2 - Ejecutar en Supabase SQL Editor
-- Este script maneja el caso cuando las políticas ya existen

-- 1. Verificar políticas actuales
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'contact_submissions';

-- 2. Eliminar TODAS las políticas existentes primero
DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public insert contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated read contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public insert chat_sessions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public update chat_sessions" ON contact_submissions;

-- 3. Crear política permisiva para inserción pública (anon role)
CREATE POLICY "Enable insert for anon users" ON contact_submissions
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- 4. Crear política para lectura autenticada  
CREATE POLICY "Enable read for authenticated users" ON contact_submissions
  FOR SELECT 
  TO authenticated
  USING (true);

-- 5. Verificar que RLS está habilitado
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 6. Test de inserción
INSERT INTO contact_submissions (name, email, phone, project_type, location, message) 
VALUES ('Test Fix V2', 'test2@fix.com', '987654321', 'test', 'test city', 'test message V2');

-- 7. Verificar que se insertó
SELECT COUNT(*) FROM contact_submissions;

-- 8. Ver los registros recientes
SELECT name, email, phone, project_type, created_at 
FROM contact_submissions 
ORDER BY created_at DESC 
LIMIT 5;
