import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eliminación de Datos - REFORMAS",
  description: "Solicitud de eliminación de datos personales",
};

export default function DataDeletion() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Eliminación de Datos
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Solicitud de Eliminación de Datos Personales
            </h2>
            <p className="text-gray-700 mb-4">
              Si deseas solicitar la eliminación de tus datos personales de
              nuestros sistemas, puedes hacerlo de las siguientes maneras:
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Métodos de Contacto
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                📧 Por Email
              </h3>
              <p className="text-gray-700 mb-2">
                Envía un email a: <strong>contacto@reformas.cl</strong>
              </p>
              <p className="text-gray-700">
                Asunto: &quot;Solicitud de Eliminación de Datos&quot;
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                📱 Por WhatsApp
              </h3>
              <p className="text-gray-700">
                Escríbenos al: <strong>+56 9 8759 3649</strong>
                <br />
                Mensaje: &quot;Solicito eliminar mis datos personales&quot;
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Información Requerida
            </h2>
            <p className="text-gray-700 mb-4">
              Para procesar tu solicitud, incluye la siguiente información:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Tu nombre completo</li>
              <li>Email asociado a tu consulta</li>
              <li>Número de teléfono (si lo proporcionaste)</li>
              <li>Fecha aproximada de tu consulta o cotización</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Tiempo de Procesamiento
            </h2>
            <p className="text-gray-700 mb-4">
              Procesaremos tu solicitud dentro de <strong>30 días</strong> desde
              su recepción. Te confirmaremos por email cuando la eliminación
              haya sido completada.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Datos que se Eliminan
            </h2>
            <p className="text-gray-700 mb-4">
              Al procesar tu solicitud, eliminaremos:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Información de contacto (nombre, email, teléfono)</li>
              <li>Mensajes y consultas realizadas</li>
              <li>Datos de cotizaciones y proyectos</li>
              <li>
                Cualquier otra información personal que hayas proporcionado
              </li>
            </ul>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              ℹ️ Nota Importante
            </h2>
            <p className="text-gray-700">
              La eliminación de datos es permanente e irreversible. Si en el
              futuro deseas utilizar nuestros servicios nuevamente, deberás
              proporcionar tu información nuevamente.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
