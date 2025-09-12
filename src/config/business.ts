// Configuración de datos del negocio - RC Reformas y Mantenciones
export const businessConfig = {
  // Información básica de la empresa
  name: "RC Reformas",
  shortName: "RC Reformas",
  tagline: "Calidad y Rapidez 🔨👷‍♂️🏗🚧",
  description:
    "Realizamos todo tipo de construcciones y remodelaciones con calidad y rapidez garantizada",

  // Datos de contacto REALES
  contact: {
    phone: "+56 9 8759 3649",
    whatsapp: "+56 9 8759 3649",
    email: "contacto@reformas.cl",
    // Dominio actual (Vercel) y futuro dominio propio
    website: "https://rcreformas.vercel.app", // Futuro: https://rcreformas.com
  },

  // Ubicación y área de servicio
  location: {
    // ⚠️ ACTUALIZAR CON DIRECCIÓN REAL
    address: "Av. Waldo Alcalde 1234", // CAMBIAR POR DIRECCIÓN REAL
    city: "Coquimbo",
    region: "Región de Coquimbo",
    country: "Chile",
    coordinates: {
      lat: -29.9027, // Coordenadas de La Serena
      lng: -71.2519,
    },
  },

  // Áreas de servicio
  serviceAreas: [
    "La Serena",
    "Coquimbo",
    "Ovalle",
    "Vicuña",
    "Andacollo",
    "Región de Coquimbo",
  ],

  // Redes sociales
  social: {
    instagram: {
      handle: "@rcconstruccionesymantenimiento",
      url: "https://www.instagram.com/rcconstruccionesymantenimiento/",
    },
    facebook: "", // Añadir si existe
    youtube: "", // Añadir si existe
    linkedin: "", // Añadir si existe
  },

  // Estadísticas de la empresa
  stats: {
    yearsExperience: 1,
    projectsCompleted: 50,
    clientSatisfaction: 100, // Porcentaje
    teammembers: 8,
  },

  // Horarios de atención
  businessHours: {
    weekdays: "Lunes a Viernes 8:00 - 18:00",
    weekends: "Sábados 9:00 - 14:00",
    emergency: "24/7 para emergencias",
  },

  // Servicios principales
  services: [
    {
      id: "construccion",
      name: "Construcción Integral",
      description:
        "Construcción de casas, edificios y obras comerciales desde cero",
      icon: "🏗️",
      features: [
        "Casas desde cero",
        "Ampliaciones",
        "Obras comerciales",
        "Proyectos industriales",
      ],
    },
    {
      id: "reformas",
      name: "Reformas Completas",
      description:
        "Remodelaciones integrales de espacios residenciales y comerciales",
      icon: "🔧",
      features: [
        "Remodelación integral",
        "Baños y cocinas",
        "Fachadas",
        "Redistribución espacios",
      ],
    },
    {
      id: "mantenciones",
      name: "Mantenciones Especializadas",
      description: "Mantenimiento preventivo y correctivo para tu propiedad",
      icon: "⚡",
      features: [
        "Pintura exterior/interior",
        "Impermeabilización",
        "Plomería y electricidad",
        "Jardinería y paisajismo",
      ],
    },
  ],

  // Garantías y certificaciones
  quality: {
    warranty: "12 meses de garantía en mano de obra",
    certifications: [
      "Empresa registrada en SEREMI",
      "Seguros de responsabilidad civil",
    ],
    materials: "Solo trabajamos con materiales de primera calidad",
    timeline: "Cumplimiento garantizado de plazos acordados",
  },

  // Precios base (para el calculador)
  pricing: {
    basePricePerM2: 180000, // Precio base por m² en CLP
    projectMultipliers: {
      construccion: 1.6,
      remodelacion: 1.0,
      ampliacion: 1.3,
      mantencion: 0.4,
      bano: 1.1,
      cocina: 1.2,
    },
    qualityMultipliers: {
      economico: 0.6,
      estandar: 1.0,
      premium: 1.5,
      lujo: 2.2,
    },
  },
};

export default businessConfig;
