import type { InfografiasConfig } from "./types";

export const infografiasConfigInicial: InfografiasConfig = {
  internetAmigo: {
    subtitulo:
      "Elige el paquete que mejor se adapte a tu ritmo. Con navegación Sin Frontera y beneficios de streaming incluidos.",
    planes: [
      { id: "150", gb: "3 GB", vigencia: "25 días", precio: "$150", redes: "Ilimitadas", prime: "Básico", music: "500MB" },
      { id: "100", gb: "1.8 GB", vigencia: "15 días", precio: "$100", redes: "Ilimitadas", prime: "Básico", music: "No" },
      { id: "200", gb: "4 GB", vigencia: "30 días", precio: "$200", redes: "Ilimitadas", prime: "Básico", music: "500MB" },
      { id: "500", gb: "10 GB", vigencia: "30 días", precio: "$500", redes: "Ilimitadas", prime: "Básico", music: "500MB" },
      { id: "20", gb: "140 MB", vigencia: "2 días", precio: "$20", redes: "200 MB", prime: "No", music: "No" },
      { id: "80", gb: "1 GB", vigencia: "12 días", precio: "$80", redes: "1.5 GB", prime: "No", music: "No" },
    ],
  },
  amigoKit: {
    heroBadge: "PROMO AMIGO KIT",
    heroTitulo: "ESTRENA Y Recibe el Doble",
    heroSubtitulo:
      "Durante 6 meses, disfruta el doble de datos al comprar tu Amigo Kit con esquema Amigo Sin Límite.",
    vigencia: "05 Sep 2025 - 02 Mar 2026",
    paquetes: [
      { p: "50", base: "500 MB", promo: "500 MB", total: "1.0 GB", hot: false },
      { p: "80", base: "800 MB", promo: "800 MB", total: "1.6 GB", hot: false },
      { p: "100", base: "1.5 GB", promo: "1.5 GB", total: "3 GB", hot: true },
      { p: "150", base: "2.5 GB", promo: "2.5 GB", total: "5 GB", hot: false },
      { p: "200", base: "3.5 GB", promo: "3.5 GB", total: "7 GB", hot: false },
      { p: "300", base: "5.5 GB", promo: "5.5 GB", total: "11 GB", hot: true },
      { p: "500", base: "8 GB", promo: "8 GB", total: "16 GB", hot: false },
    ],
  },
  chipExpress: {
    heroBadge: "Activación Inmediata",
    heroSubtitulo: "Conéctate al instante con la Red más rápida de México. Sin contratos, sin esperas.",
    beneficios: [
      { titulo: "Cobertura Total", descripcion: "La mejor señal en todo el país." },
      { titulo: "Velocidad 5G", descripcion: "Navega a la máxima potencia disponible." },
      { titulo: "Control Total", descripcion: "Gestiona todo desde Mi Telcel." },
    ],
    pasos: [
      { titulo: "Inserta", descripcion: "Coloca tu nuevo Chip Express en tu Smartphone desbloqueado." },
      { titulo: "Recarga", descripcion: "Realiza una recarga desde $50 para activar tus beneficios." },
      { titulo: "Disfruta", descripcion: "Realiza una llamada o navega para dar de alta tu línea." },
    ],
    ctaTexto: "¿Ya tienes tu Chip?",
    footerTexto: "Amigo de Telcel - Chip Express 2026",
  },
  amigoVieneConTodo: {
    descripcion:
      "Estrena un Huawei participante y recibe un Paquete SL300 Gratis con tu primera activación.",
    fechaCierre: "28 FEB 2026",
    paqueteRegalo: "SL300",
    modelos: [
      { nombre: "Nova 13", detalle: "256GB | 4.5G", tipo: "Smartphone" },
      { nombre: "Nova 13 + Watch Fit 3", detalle: "HB | 4.5G", tipo: "Bundle" },
      { nombre: "Watch 5 42MM", detalle: "SOC-L19L / L29L / L29M", tipo: "Watch" },
      { nombre: "Watch 5 46MM", detalle: "RTS-L19F / L29M / L39L", tipo: "Watch" },
    ],
  },
  portabilidad: {
    vigenciaDisplay: "Válido del 23 de Jun al 2 de Mar",
    fechaInicio: "23 de junio",
    fechaFin: "2 de marzo",
    footerTexto: "Aplican términos y condiciones. Vigencia del 23 de junio al 2 de marzo.",
  },
  internetPorTiempo: {
    paquetes: [
      { id: "1", horas: "1 hora", precio: "$10", recomendado: false },
      { id: "2", horas: "2 horas", precio: "$15", recomendado: false },
      { id: "4", horas: "4 horas", precio: "$25", recomendado: true },
    ],
  },
};
