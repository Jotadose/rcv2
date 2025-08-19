"use client";

import Image from "next/image";
import { useState, useEffect } from 'react';
import { Camera, ExternalLink } from "lucide-react";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
  media_type: string;
}

const LOCAL_MODE = process.env.NEXT_PUBLIC_INSTAGRAM_LOCAL === 'true';
const LOCAL_IMAGES: { src: string; caption: string }[] = [
  { src: '/instagram/1.jpg', caption: 'Proyecto 1 RC Reformas' },
  { src: '/instagram/2.jpg', caption: 'Proyecto 2 RC Reformas' },
  { src: '/instagram/3.jpg', caption: 'Proyecto 3 RC Reformas' },
  { src: '/instagram/4.jpg', caption: 'Proyecto 4 RC Reformas' },
  { src: '/instagram/5.jpg', caption: 'Proyecto 5 RC Reformas' },
  { src: '/instagram/6.jpg', caption: 'Proyecto 6 RC Reformas' },
];

export default function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (LOCAL_MODE) {
      const now = new Date().toISOString();
      setPosts(
        LOCAL_IMAGES.map((img, i) => ({
          id: `local-${i + 1}`,
          media_url: img.src,
          permalink: 'https://www.instagram.com/rcconstruccionesymantenimiento/',
          caption: img.caption,
          timestamp: now,
          media_type: 'IMAGE'
        }))
      );
      setLoading(false);
    } else {
      fetchInstagramPosts();
    }
  }, []);

  const fetchInstagramPosts = async () => {
    try {
      const response = await fetch('/api/instagram');
      const data = await response.json();
      if (data.success) setPosts(data.data);
      else setError('No se pudieron cargar las publicaciones');
    } catch (e: unknown) {
      console.error('Instagram fetch error', e);
      setError('Error al conectar con Instagram');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Síguenos en Instagram
            </h2>
            <p className="text-xl text-gray-600">Cargando publicaciones...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['a','b','c','d','e','f'].map(k => (
              <div key={`skeleton-${k}`} className="bg-gray-200 animate-pulse rounded-lg aspect-square" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && !LOCAL_MODE) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Síguenos en Instagram</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <a
            href="https://www.instagram.com/rcconstruccionesymantenimiento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            <Camera className="w-5 h-5 mr-2" /> Ver en Instagram
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-pink-500 mr-3" />
            <h2 className="text-4xl font-bold text-slate-800">Síguenos en Instagram</h2>
          </div>
          <p className="text-xl text-gray-600 mb-6">{LOCAL_MODE ? 'Proyectos destacados' : 'Nuestros últimos proyectos en tiempo real'}</p>
          <a
            href="https://www.instagram.com/rcconstruccionesymantenimiento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            <Camera className="w-5 h-5 mr-2" /> @rcconstruccionesymantenimiento <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0,6).map(post => (
            <div key={post.id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Proyecto RC Reformas'}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{post.caption}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleDateString('es-CL')}</span>
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-pink-500 hover:text-pink-600 font-semibold text-sm"
                  >
                    Ver post <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/rcconstruccionesymantenimiento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-colors"
          >
            <Camera className="w-5 h-5 mr-2" /> Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
