import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad - RC Reformas",
  description: "Política de privacidad y protección de datos de RC Reformas",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Política de Privacidad
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Última actualización: {new Date().toLocaleDateString("es-CL")}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              1. Información que Recopilamos
            </h2>
            <p className="text-gray-700 mb-4">
              En RC Reformas recopilamos información que nos proporcionas
              directamente cuando:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Completas formularios de contacto en nuestro sitio web</li>
              <li>Solicitas cotizaciones a través de nuestro chatbot</li>
              <li>Te comunicas con nosotros por WhatsApp o email</li>
              <li>Navegas por nuestro sitio web (datos de uso anónimos)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              2. Uso de la Información
            </h2>
            <p className="text-gray-700 mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Responder a tus consultas y solicitudes de cotización</li>
              <li>Proporcionar nuestros servicios de construcción y reforma</li>
              <li>Mejorar nuestro sitio web y servicios</li>
              <li>
                Enviar información relevante sobre nuestros servicios (con tu
                consentimiento)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              3. Integración con Redes Sociales
            </h2>
            <p className="text-gray-700 mb-4">
              Nuestro sitio web muestra publicaciones de nuestro perfil público
              de Instagram para mostrar nuestros proyectos recientes. Esta
              integración utiliza la API oficial de Instagram y solo accede a
              contenido público.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              4. Protección de Datos
            </h2>
            <p className="text-gray-700 mb-4">
              Implementamos medidas de seguridad apropiadas para proteger tu
              información personal contra acceso no autorizado, alteración,
              divulgación o destrucción.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              5. Tus Derechos
            </h2>
            <p className="text-gray-700 mb-4">Tienes derecho a:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Acceder a tus datos personales</li>
              <li>Corregir información incorrecta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              6. Contacto
            </h2>
            <p className="text-gray-700 mb-4">
              Si tienes preguntas sobre esta política de privacidad o quieres
              ejercer tus derechos, contáctanos:
            </p>
            <ul className="list-none text-gray-700">
              <li>Email: contacto@rcreformas.cl</li>
              <li>WhatsApp: +56 9 5123 4567</li>
              <li>Dirección: La Serena, Región de Coquimbo, Chile</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
