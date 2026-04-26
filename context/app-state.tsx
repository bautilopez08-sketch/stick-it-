"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { CatalogDesign } from "@/lib/catalog";
import { getTotalPrice, getUnitPrice } from "@/lib/pricing";
import { CartItem, DesignDraft, Order, OrderCustomer } from "@/lib/types";

type AppStateContextValue = {
  cart: CartItem[];
  savedDesigns: DesignDraft[];
  orders: Order[];
  catalogItems: CatalogDesign[];
  addToCart: (draft: DesignDraft) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  saveDesign: (draft: DesignDraft) => void;
  submitOrder: (customer: OrderCustomer) => void;
  addCatalogItem: (item: CatalogDesign) => void;
  updateCatalogItem: (id: string, patch: Partial<CatalogDesign>) => void;
  removeCatalogItem: (id: string) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
};

const CART_KEY = "stick-it-cart";
const SAVED_KEY = "stick-it-designs";
const ORDERS_KEY = "stick-it-orders";
const CATALOG_KEY = "stick-it-catalog-designs";

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedDesigns, setSavedDesigns] = useState<DesignDraft[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [catalogItems, setCatalogItems] = useState<CatalogDesign[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const nextCart = window.localStorage.getItem(CART_KEY);
    const nextSaved = window.localStorage.getItem(SAVED_KEY);
    const nextOrders = window.localStorage.getItem(ORDERS_KEY);
    const nextCatalog = window.localStorage.getItem(CATALOG_KEY);

    if (nextCart) setCart(JSON.parse(nextCart));
    if (nextSaved) setSavedDesigns(JSON.parse(nextSaved));
    if (nextOrders) setOrders(JSON.parse(nextOrders));
    if (nextCatalog) setCatalogItems(JSON.parse(nextCatalog));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedDesigns));
  }, [savedDesigns, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CATALOG_KEY, JSON.stringify(catalogItems));
    window.dispatchEvent(new Event("stick-it-catalog-updated"));
  }, [catalogItems, hydrated]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      cart,
      savedDesigns,
      orders,
      catalogItems,
      addToCart: (draft) => {
        const item: CartItem = {
          id: `${draft.id}-${Date.now()}`,
          draft,
          unitPrice: getUnitPrice(draft),
          totalPrice: getTotalPrice(draft)
        };
        setCart((current) => [item, ...current]);
      },
      removeFromCart: (id) => {
        setCart((current) => current.filter((item) => item.id !== id));
      },
      clearCart: () => setCart([]),
      saveDesign: (draft) => {
        const next = { ...draft, savedAt: new Date().toISOString() };
        setSavedDesigns((current) => [next, ...current.filter((item) => item.id !== draft.id)].slice(0, 12));
      },
      submitOrder: (customer) => {
        if (cart.length === 0) return;
        const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        const shipping = 12;
        const order: Order = {
          id: `order-${Date.now()}`,
          createdAt: new Date().toISOString(),
          items: cart,
          customer,
          subtotal,
          shipping,
          total: subtotal + shipping,
          status: "Nuevo"
        };
        setOrders((current) => [order, ...current]);
        setCart([]);
      },
      addCatalogItem: (item) => {
        setCatalogItems((current) => [{ ...item, createdAt: item.createdAt ?? new Date().toISOString() }, ...current]);
      },
      updateCatalogItem: (id, patch) => {
        setCatalogItems((current) =>
          current.map((item) => (item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item))
        );
      },
      removeCatalogItem: (id) => {
        setCatalogItems((current) => current.filter((item) => item.id !== id));
      },
      updateOrderStatus: (id, status) => {
        setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)));
      }
    }),
    [cart, catalogItems, orders, savedDesigns]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}
