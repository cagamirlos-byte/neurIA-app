
import { GoogleGenAI, Type } from "@google/genai";
import { DiscoverTool, DiscoveryResponse, GroundingSource } from "./types.ts";

/**
 * Discovers new AI tools based on a query and category using Gemini with Google Search grounding.
 */
export const discoverNewTools = async (query: string, category: string): Promise<DiscoveryResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const contextPrompt = category === 'All' 
      ? `la intención de búsqueda general: "${query}"` 
      : `la categoría específica "${category}" y relacionada con: "${query}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Eres un experto en herramientas de Inteligencia Artificial. Tu tarea es descubrir 3 herramientas innovadoras y útiles basadas en información actual de la web.
      
      CRITERIO DE BÚSQUEDA:
      Utiliza Google Search para encontrar las herramientas más recientes para ${contextPrompt}.
      
      REQUISITOS DE RESPUESTA:
      1. Las herramientas deben tener al menos una opción gratuita (Free o Freemium).
      2. El enlace debe ser real y directo.
      3. La descripción debe ser concisa (máximo 150 caracteres) y destacar un caso de uso real.
      
      Responde EXCLUSIVAMENTE en formato JSON siguiendo el esquema proporcionado.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              url: { type: Type.STRING },
              category: { 
                type: Type.STRING,
                description: 'Categoría de la herramienta'
              },
              pricingNote: { type: Type.STRING, description: 'Ej: "Gratis", "Freemium", etc.' }
            },
            required: ["name", "description", "url", "category", "pricingNote"]
          }
        }
      }
    });

    const text = response.text;
    const tools: DiscoveredTool[] = text ? JSON.parse(text) : [];
    
    // Extract grounding sources as required by guidelines
    const sources: GroundingSource[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          sources.push({
            title: chunk.web.title,
            url: chunk.web.uri
          });
        }
      });
    }

    return {
      tools: Array.isArray(tools) ? tools : [],
      sources: sources
    };
  } catch (error) {
    console.error("Error discovering tools with search:", error);
    return { tools: [], sources: [] };
  }
};

/**
 * Generates a custom logo for the NeurIA app using gemini-2.5-flash-image.
 */
export const generateAppLogo = async (): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{
          text: "A professional, minimalist, futuristic logo for an AI application named 'NeurIA'. The logo features a stylized human brain integrated with digital neural network nodes and glowing fiber-optic circuits. Color palette: neon cyan, vibrant fuchsia, and electric violet over a dark background. High contrast, vector style, clean lines, youthful and energetic vibe. 1:1 aspect ratio."
        }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating logo:", error);
    return null;
  }
};
