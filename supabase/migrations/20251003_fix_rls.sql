-- Fix para RLS - Ejecutar en Supabase SQL Editor

-- 1. Verificar políticas actuales
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'contact_submissions';

-- 2. Eliminar políticas existentes y recrear correctamente
DROP POLICY IF EXISTS "Allow public insert contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated read contact_submissions" ON contact_submissions;

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
VALUES ('Test Fix', 'test@fix.com', '123456789', 'test', 'test city', 'test message');

-- 7. Verificar que se insertó
SELECT COUNT(*) FROM contact_submissions;
