-- PASO 1: CREAR LA TABLA contact_submissions (ejecutar solo si no existe)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  project_type VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  message TEXT,
  budget_range VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PASO 2: DESACTIVAR RLS COMPLETAMENTE PARA TESTING
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- PASO 3: VERIFICAR QUE LA TABLA EXISTE Y NO TIENE RLS
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'contact_submissions';

-- PASO 4: INSERTAR UN REGISTRO DE PRUEBA
INSERT INTO contact_submissions (name, phone, project_type, location, message)
VALUES ('Test User', '+56912345678', 'Remodelación', 'Santiago', 'Mensaje de prueba');

-- PASO 5: VERIFICAR QUE SE INSERTÓ
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 1;
