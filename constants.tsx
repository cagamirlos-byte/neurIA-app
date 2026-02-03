
import { AICategory, AITool } from './types';

export const TOOLS: AITool[] = [
  // --- TEXT ---
  {
    id: 'chatgpt',
    name: 'ChatGPT (GPT-4o mini)',
    description: 'El modelo de lenguaje más popular del mundo. Ideal para redacción creativa, depuración de código y aprendizaje interactivo.',
    url: 'https://chat.openai.com',
    category: AICategory.TEXT,
    pricingType: 'Freemium',
    pricingNote: 'Gratis con límites en modelos avanzados.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    description: 'La IA de Anthropic que destaca por su razonamiento ético, escritura natural y capacidad de análisis de documentos extensos.',
    url: 'https://claude.ai',
    category: AICategory.TEXT,
    pricingType: 'Freemium',
    pricingNote: 'Acceso gratuito con cuota diaria de mensajes.',
    imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'deepl-write',
    name: 'DeepL Write',
    description: 'Asistente de escritura que mejora la gramática, el estilo y el tono de tus textos en varios idiomas con precisión quirúrgica.',
    url: 'https://www.deepl.com/write',
    category: AICategory.TEXT,
    pricingType: 'Free',
    pricingNote: 'Uso gratuito ilimitado para textos cortos.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'quillbot',
    name: 'Quillbot',
    description: 'Herramienta de parafraseo y resumen que ayuda a reescribir textos manteniendo el significado original.',
    url: 'https://quillbot.com',
    category: AICategory.TEXT,
    pricingType: 'Freemium',
    pricingNote: 'Plan gratuito con límite de palabras.',
    imageUrl: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=600'
  },

  // --- IMAGE ---
  {
    id: 'leonardo',
    name: 'Leonardo.ai',
    description: 'Crea activos visuales de alta calidad con un control excepcional sobre el estilo, la iluminación y la composición.',
    url: 'https://leonardo.ai',
    category: AICategory.IMAGE,
    pricingType: 'Freemium',
    pricingNote: '150 tokens gratuitos cada 24 horas.',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'playground-ai',
    name: 'Playground AI',
    description: 'Plataforma versátil para generar y editar imágenes con Stable Diffusion, permitiendo hasta 50 imágenes diarias gratis.',
    url: 'https://playgroundai.com',
    category: AICategory.IMAGE,
    pricingType: 'Freemium',
    pricingNote: '50 imágenes gratis al día.',
    imageUrl: 'https://images.unsplash.com/photo-1547891269-0552d11f21c6?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ms-designer',
    name: 'Microsoft Designer',
    description: 'Crea diseños gráficos, logos e ilustraciones fotorrealistas con DALL-E 3 de forma totalmente integrada y gratuita.',
    url: 'https://designer.microsoft.com',
    category: AICategory.IMAGE,
    pricingType: 'Free',
    pricingNote: 'Gratis con cuenta de Microsoft.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600'
  },

  // --- VIDEO ---
  {
    id: 'luma-dream',
    name: 'Luma Dream Machine',
    description: 'Generador de video de alta fidelidad capaz de crear escenas realistas de 5 segundos a partir de texto o imágenes.',
    url: 'https://lumalabs.ai/dream-machine',
    category: AICategory.VIDEO,
    pricingType: 'Freemium',
    pricingNote: '30 generaciones gratuitas al mes.',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pika',
    name: 'Pika Art',
    description: 'Plataforma líder en video generativo que permite animar cualquier objeto o escena con una fluidez asombrosa.',
    url: 'https://pika.art',
    category: AICategory.VIDEO,
    pricingType: 'Freemium',
    pricingNote: 'Sistema de créditos recargables diariamente.',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    description: 'Crea videos con avatares de IA realistas que hablan en múltiples idiomas con sincronización labial perfecta.',
    url: 'https://www.heygen.com',
    category: AICategory.VIDEO,
    pricingType: 'Freemium',
    pricingNote: '1 crédito gratis para prueba.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600'
  },

  // --- AUDIO ---
  {
    id: 'suno-v3',
    name: 'Suno AI',
    description: 'Capaz de crear canciones completas (letra, melodía y voz) con calidad de estudio en segundos.',
    url: 'https://suno.com',
    category: AICategory.AUDIO,
    pricingType: 'Freemium',
    pricingNote: '50 créditos diarios gratuitos.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253344-9914f2558a37?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'adobe-podcast',
    name: 'Adobe Podcast Enhance',
    description: 'Elimina el ruido de fondo y mejora la calidad de tu voz para que parezca grabada en un estudio profesional.',
    url: 'https://podcast.adobe.com/enhance',
    category: AICategory.AUDIO,
    pricingType: 'Free',
    pricingNote: 'Uso gratuito para archivos MP3/WAV.',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600'
  },

  // --- CODING ---
  {
    id: 'cursor',
    name: 'Cursor Editor',
    description: 'El editor de código (fork de VS Code) diseñado específicamente para trabajar con IA integrada en el flujo de trabajo.',
    url: 'https://cursor.sh/pricing',
    category: AICategory.CODING,
    pricingType: 'Freemium',
    pricingNote: '2000 peticiones gratis al mes.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'blackbox-ai',
    name: 'Blackbox AI',
    description: 'Extensión de autocompletado de código y búsqueda de funciones que acelera el desarrollo significativamente.',
    url: 'https://www.blackbox.ai',
    category: AICategory.CODING,
    pricingType: 'Freemium',
    pricingNote: 'Versión gratuita potente para devs.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'
  },

  // --- RESEARCH ---
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'El "Google Killer". Un motor de respuestas que cita fuentes reales y permite navegar por internet en tiempo real.',
    url: 'https://www.perplexity.ai',
    category: AICategory.RESEARCH,
    pricingType: 'Free',
    pricingNote: 'Búsquedas estándar ilimitadas gratuitas.',
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'consensus',
    name: 'Consensus',
    description: 'Buscador científico que utiliza IA para encontrar respuestas basadas en evidencia en más de 200 millones de artículos.',
    url: 'https://consensus.app',
    category: AICategory.RESEARCH,
    pricingType: 'Freemium',
    pricingNote: 'Búsquedas ilimitadas en plan base.',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gamma',
    name: 'Gamma App',
    description: 'Genera presentaciones, documentos y páginas web completas en segundos con solo escribir una idea.',
    url: 'https://gamma.app',
    category: AICategory.RESEARCH,
    pricingType: 'Freemium',
    pricingNote: '400 créditos gratuitos al inicio.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600'
  },

  // --- PREMIUM ---
  {
    id: 'midjourney',
    name: 'Midjourney v6',
    description: 'Líder indiscutible en generación de arte digital fotorrealista y estilizado mediante prompts avanzados en Discord.',
    url: 'https://www.midjourney.com/plans',
    category: AICategory.PREMIUM,
    pricingType: 'Paid',
    pricingNote: 'Desde $10/mes. La suscripción es necesaria.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    description: 'Plataforma empresarial para la creación de contenidos de marketing, optimizada para SEO y voz de marca personalizada.',
    url: 'https://www.jasper.ai/pricing',
    category: AICategory.PREMIUM,
    pricingType: 'Paid',
    pricingNote: 'Desde $39/mes. Enfoque profesional.',
    imageUrl: 'https://images.unsplash.com/photo-1454165833767-027fffd30357?auto=format&fit=crop&q=80&w=600'
  }
];
