import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instagram Setup - RC Reformas",
  description: "Configuración de integración con Instagram",
};

export default function InstagramSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            � Instagram Integration - RC Reformas
          </h1>

          <div className="prose prose-gray max-w-none">
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-sm text-green-700">
                ✅ <strong>Instagram funcionando con embeds directos</strong>
                <br />
                Las publicaciones se cargan directamente desde Instagram sin
                necesidad de API ni tokens.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🎯 Método Actual: Embeds Directos
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                ✅ Ventajas del método actual
              </h3>
              <ul className="text-blue-800 space-y-2">
                <li>• ✅ Sin configuración de Meta/Facebook</li>
                <li>• ✅ Sin tokens que expiren</li>
                <li>• ✅ Sin límites de API</li>
                <li>• ✅ Embeds oficiales de Instagram</li>
                <li>• ✅ Actualización instantánea</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🔧 Cómo actualizar publicaciones
            </h2>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                Método 1: Editar el código (Recomendado)
              </h3>
              <p className="text-purple-800 mb-3">
                Las URLs están en:{" "}
                <code className="bg-purple-100 px-2 py-1 rounded">
                  src/components/InstagramEmbedGrid.tsx
                </code>
              </p>
              <p className="text-purple-700 text-sm">
                Simplemente cambia las URLs en el array DEFAULT_INSTAGRAM_POSTS
                y haz deploy.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-4">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">
                Método 2: Variable de entorno (Opcional)
              </h3>
              <p className="text-orange-800 mb-3">
                Puedes usar la variable en{" "}
                <code className="bg-orange-100 px-2 py-1 rounded">
                  .env.local
                </code>
                :
              </p>
              <code className="bg-orange-100 text-orange-900 px-3 py-1 rounded text-sm block">
                NEXT_PUBLIC_INSTAGRAM_EMBED_URLS=url1,url2,url3,url4,url5
              </code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              � Publicaciones actuales
            </h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-3">
                Las siguientes publicaciones están configuradas:
              </p>
              <ol className="text-gray-600 text-sm space-y-1">
                <li>1. https://www.instagram.com/p/DNXBdDYOzvu/</li>
                <li>2. https://www.instagram.com/p/DNUJAdnvB_5/</li>
                <li>3. https://www.instagram.com/p/DNUILkkvCjs/</li>
                <li>4. https://www.instagram.com/p/DM0T4ZyuB3W/</li>
                <li>5. https://www.instagram.com/p/DM0TaiEOq7d/</li>
              </ol>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              🔍 Verificar funcionamiento
            </h2>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800 mb-3">
                Las publicaciones aparecen en la página principal del sitio web.
              </p>
              <Link
                href="/"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                🏠 Ver página principal
              </Link>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                💡 Información técnica
              </h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>
                  • Los embeds usan el script oficial de Instagram (embed.js)
                </li>
                <li>
                  • Se cargan de forma asíncrona para no bloquear la página
                </li>
                <li>• Son responsivos y se adaptan al diseño</li>
                <li>• Incluyen lazy loading automático</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
