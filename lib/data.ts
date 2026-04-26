import { DesignDraft, FontKey } from "@/lib/types";

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/create", label: "Crea tu sticker" },
  { href: "/catalog", label: "Catalogo" },
  { href: "/about", label: "Sobre Stick-it" },
  { href: "/contact", label: "Soporte" }
];

export const categoryHighlights = [
  "Comics",
  "Personajes inspirados",
  "Futbol",
  "Cultura popular",
  "Memes",
  "Musica",
  "Gaming",
  "Anime",
  "Series y peliculas",
  "Deportes",
  "Logos",
  "Frases",
  "Minimalistas",
  "Vintage",
  "Urbanos"
] as const;

export const fontOptions: Array<{ key: FontKey; label: string; family: string; vibe: string }> = [
  { key: "display", label: "Impacto", family: "var(--font-space-grotesk)", vibe: "Moderna y potente" },
  { key: "urban", label: "Street", family: "\"Trebuchet MS\", sans-serif", vibe: "Urbana y expresiva" },
  { key: "elegant", label: "Editorial", family: "Georgia, serif", vibe: "Elegante y premium" },
  { key: "fun", label: "Bubble", family: "\"Comic Sans MS\", cursive", vibe: "Divertida y amigable" },
  { key: "mono", label: "Mono", family: "\"Courier New\", monospace", vibe: "Tecnica y gaming" },
  { key: "minimal", label: "Minimal", family: "Arial, sans-serif", vibe: "Limpia y directa" }
];

export const testimonials = [
  { name: "Luca, tienda urbana", quote: "Pasamos de una idea suelta a un sticker listo para vender en menos de diez minutos." },
  { name: "Sofi, artista independiente", quote: "El editor es tan visual que pude probar tipografias, colores y efectos sin saber diseñar." },
  { name: "Agus, marca de cafe", quote: "El mockup del termo nos ayudó a validar rápido cómo se iba a ver el diseño." }
];

export const faqs = [
  { question: "¿Puedo subir mis propias imagenes?", answer: "Sí. El editor está centrado en subir tu imagen, moverla y personalizarla sin fricción." },
  { question: "¿Puedo guardar diseños?", answer: "Sí. La sección de cuenta guarda diseños recientes y favoritos en este navegador." },
  { question: "¿Cómo se calculan los precios?", answer: "El precio cambia según tamaño, forma y cantidad del pedido." },
  { question: "¿El panel de dueños recibe pedidos?", answer: "Sí. Cada compra del checkout aparece en la web interna para gestionar pedidos." }
];

export const starterDraft: DesignDraft = {
  id: "draft-starter",
  name: "Mi sticker",
  text: "",
  font: "display",
  textColor: "#08121f",
  textSize: 54,
  letterSpacing: 1,
  bold: true,
  italic: false,
  uppercase: false,
  shadow: true,
  outline: false,
  curved: 0,
  format: "vinyl",
  size: "M",
  shape: "rounded",
  quantity: 50,
  textElement: { x: 50, y: 62, scale: 1, rotation: -4 },
  images: []
};
