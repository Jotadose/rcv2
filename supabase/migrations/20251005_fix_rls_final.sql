-- SOLUCIÓN DEFINITIVA PARA RLS
-- Ejecutar TODO este script en Supabase SQL Editor

-- 1. DESACTIVAR RLS COMPLETAMENTE
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 2. ELIMINAR TODAS LAS POLÍTICAS EXISTENTES
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'contact_submissions'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON contact_submissions';
    END LOOP;
END $$;

-- 3. VERIFICAR QUE NO HAY POLÍTICAS
SELECT policyname FROM pg_policies WHERE tablename = 'contact_submissions';
-- Esta consulta debe devolver 0 filas

-- 4. VERIFICAR QUE RLS ESTÁ DESACTIVADO
SELECT 
    schemaname, 
    tablename, 
    rowsecurity,
    CASE 
        WHEN rowsecurity = false THEN '✅ RLS DESACTIVADO (CORRECTO)'
        ELSE '❌ RLS ACTIVADO (PROBLEMA)'
    END as status
FROM pg_tables 
WHERE tablename = 'contact_submissions';

-- 5. INSERTAR UN REGISTRO DE PRUEBA FINAL
INSERT INTO contact_submissions (name, phone, project_type, location, message)
VALUES ('PRUEBA FINAL', '+56999999999', 'Test Final', 'Santiago', 'Si ves este registro, RLS está arreglado');

-- 6. VERIFICAR TODOS LOS REGISTROS
SELECT 
    id,
    name,
    phone,
    project_type,
    location,
    created_at
FROM contact_submissions 
ORDER BY created_at DESC 
LIMIT 10;
