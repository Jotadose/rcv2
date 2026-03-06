import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instagram Setup - RC Reformas",
  description: "Configuracion actual de la galeria de Instagram",
};

export default function InstagramSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Instagram showcase actual
          </h1>

          <div className="prose prose-gray max-w-none">
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-sm text-green-700">
                La home usa una grilla estatica y configurable. No depende de
                tokens, webhooks ni endpoints de Meta.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Metodo soportado
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <ul className="text-blue-800 space-y-2">
                <li>Usa assets locales optimizados con `next/image`.</li>
                <li>
                  Puedes reemplazar los links visibles con
                  `NEXT_PUBLIC_INSTAGRAM_EMBED_URLS`.
                </li>
                <li>No se ejecutan fetches a `/api/instagram`.</li>
                <li>Los endpoints OAuth y webhook quedaron deshabilitados.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Variables de entorno
            </h2>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <code className="bg-orange-100 text-orange-900 px-3 py-1 rounded text-sm block">
                NEXT_PUBLIC_INSTAGRAM_EMBED_URLS=url1,url2,url3,url4
              </code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Donde se configura
            </h2>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-purple-800 mb-2">
                Logica de la grilla:
                <code className="bg-purple-100 px-2 py-1 rounded ml-2">
                  src/components/InstagramEmbedGrid.tsx
                </code>
              </p>
              <p className="text-purple-800">
                Fallback local y parseo de URLs:
                <code className="bg-purple-100 px-2 py-1 rounded ml-2">
                  src/config/instagram.ts
                </code>
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
              <h2 className="text-lg font-semibold text-yellow-900 mb-2">
                Nota importante
              </h2>
              <p className="text-yellow-700 text-sm">
                Si en el futuro necesitas Graph API real, conviene crear una
                integracion nueva en vez de reactivar el flujo legacy.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Ver pagina principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
