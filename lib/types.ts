export type StickerShape = "circle" | "square" | "rectangle" | "rounded" | "die-cut";
export type StickerSize = "S" | "M" | "L";
export type StickerFormat = "vinyl";
export type FontKey = "display" | "urban" | "elegant" | "fun" | "mono" | "minimal";

export type DesignElement = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export type ImageLayer = {
  id: string;
  src: string;
  name: string;
  origin: "upload" | "catalog";
  element: DesignElement;
  skewX: number;
  skewY: number;
  opacity: number;
  shadow: boolean;
  tint: number;
};

export type DesignDraft = {
  id: string;
  name: string;
  text: string;
  font: FontKey;
  textColor: string;
  textSize: number;
  letterSpacing: number;
  bold: boolean;
  italic: boolean;
  uppercase: boolean;
  shadow: boolean;
  outline: boolean;
  curved: number;
  format: StickerFormat;
  size: StickerSize;
  shape: StickerShape;
  quantity: number;
  textElement: DesignElement;
  images: ImageLayer[];
  savedAt?: string;
};

export type CartItem = {
  id: string;
  draft: DesignDraft;
  unitPrice: number;
  totalPrice: number;
};

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  shippingMethod: string;
  paymentMethod: string;
  notes: string;
};

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: OrderCustomer;
  subtotal: number;
  shipping: number;
  total: number;
  status: "Nuevo" | "En produccion" | "Despachado";
};
