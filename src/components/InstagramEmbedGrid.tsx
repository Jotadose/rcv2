"use client";

import React, { useEffect, useState } from "react";

// Component props interface
export interface InstagramEmbedGridProps {
  readonly urls?: string[]; // array de URLs de posts (opcional)
  readonly limit?: number; // límite opcional
}

interface APIMediaItem {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  caption: string;
  permalink: string;
  timestamp: string;
  username: string;
  media_url: string;
  thumbnail_url?: string; // Solo para videos
}

interface ProcessedMediaItem {
  key: string;
  href: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  code: string;
  caption?: string;
  isVideo: boolean;
  isCarousel: boolean;
}

// Componente optimizado para renderizar cada tipo de media
const MediaRenderer: React.FC<{
  item: ProcessedMediaItem;
  useApi: boolean;
}> = ({ item, useApi }) => {
  if (!item.mediaUrl && !useApi) {
    // Fallback para URLs estáticas sin API
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-500 p-4 text-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto bg-gray-300 rounded-lg flex items-center justify-center">
            📷
          </div>
          <div className="text-xs">{item.code}</div>
        </div>
      </div>
    );
  }

  if (item.isVideo) {
    // Optimización específica para videos
    const videoSrc = item.thumbnailUrl || item.mediaUrl;
    return (
      <div className="relative w-full h-full bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={videoSrc}
          alt={item.caption || `Video ${item.code}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback si el thumbnail falla
            const target = e.target as HTMLImageElement;
            if (target.src !== item.mediaUrl) {
              target.src = item.mediaUrl;
            }
          }}
        />

        {/* Video overlay con mejor diseño */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/60 rounded-full p-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/80 group-hover:scale-110">
            <svg
              className="w-8 h-8 text-white drop-shadow-lg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Badge de video */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
          VIDEO
        </div>
      </div>
    );
  }

  if (item.isCarousel) {
    // Optimización para carruseles
    return (
      <div className="relative w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.mediaUrl}
          alt={item.caption || `Carrusel ${item.code}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge de carrusel */}
        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 6h4v12H2V6zm14 0h4v12h-4V6zM8 6h6v12H8V6z" />
          </svg>
          ALBUM
        </div>
      </div>
    );
  }

  // Optimización para imágenes normales
  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.mediaUrl}
        alt={item.caption || `Imagen ${item.code}`}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

const InstagramEmbedGrid: React.FC<InstagramEmbedGridProps> = ({
  urls = [],
  limit = 8,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiItems, setApiItems] = useState<APIMediaItem[]>([]);

  // If explicit URLs are provided we keep old static approach; else fetch from API route
  const useApi = urls.length === 0;

  useEffect(() => {
    if (!useApi) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("/api/instagram")
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((json) => {
        if (cancelled) return;
        setApiItems(json.data || []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError("No se pudo cargar Instagram");
        console.error("[Instagram] error", err);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [useApi]);

  // Función para procesar y optimizar cada media item
  const processMediaItem = (item: APIMediaItem): ProcessedMediaItem => {
    const isVideo = item.media_type === "VIDEO";
    const isCarousel = item.media_type === "CAROUSEL_ALBUM";

    return {
      key: item.id,
      href: item.permalink,
      mediaUrl: item.media_url,
      thumbnailUrl: isVideo ? item.thumbnail_url : undefined,
      code: item.id,
      caption: item.caption,
      isVideo,
      isCarousel,
    };
  };

  const staticList = (limit ? urls.slice(0, limit) : urls).filter(Boolean);
  const itemsToShow: ProcessedMediaItem[] = useApi
    ? apiItems.slice(0, limit || apiItems.length).map(processMediaItem)
    : staticList.map((url, idx) => {
        const regex = /\/p\/([^/?]+)/;
        const match = regex.exec(url);
        const code = match ? match[1] : `item-${idx}`;
        return {
          key: code,
          href: url,
          mediaUrl: "",
          code,
          isVideo: false,
          isCarousel: false,
        };
      });

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Nuestros Proyectos en Instagram
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre nuestros últimos trabajos y proyectos de construcción y
            reformas
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {useApi && loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              <span className="text-lg">Cargando últimas publicaciones...</span>
            </div>
          </div>
        )}

        {useApi && error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-red-500 bg-red-50 px-6 py-3 rounded-lg">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {!useApi && staticList.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No hay publicaciones configuradas.
          </p>
        )}

        {itemsToShow.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {itemsToShow.map((item) => (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-xl overflow-hidden bg-white aspect-square shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <MediaRenderer item={item} useApi={useApi} />

                {/* Overlay gradient universal */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Instagram icon overlay */}
                <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <svg
                    className="w-4 h-4 text-pink-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z" />
                  </svg>
                </div>

                {/* Caption overlay mejorado */}
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium line-clamp-2 drop-shadow-lg">
                      {item.caption.length > 80
                        ? `${item.caption.substring(0, 80)}...`
                        : item.caption}
                    </p>
                  </div>
                )}
              </a>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/rcconstruccionesymantenimiento/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z" />
            </svg>
            <span>@rcconstruccionesymantenimiento</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramEmbedGrid;
