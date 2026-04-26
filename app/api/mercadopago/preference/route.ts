import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Falta configurar MERCADOPAGO_ACCESS_TOKEN en el entorno del proyecto." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items : [];
  const customer = body.customer ?? {};

  if (items.length === 0) {
    return NextResponse.json({ message: "No hay productos para generar la preferencia de pago." }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  const preferencePayload = {
    items: items.map((item: { title: string; description?: string; quantity: number; unit_price: number; picture_url?: string }) => {
      const payloadItem = {
        title: item.title,
        description: item.description || "Sticker personalizado Stick-it",
        quantity: Number(item.quantity),
        currency_id: "ARS",
        unit_price: Number(item.unit_price)
      } as {
        title: string;
        description: string;
        quantity: number;
        currency_id: "ARS";
        unit_price: number;
        picture_url?: string;
      };

      if (item.picture_url && /^https?:\/\//.test(item.picture_url)) {
        payloadItem.picture_url = item.picture_url;
      }

      return payloadItem;
    }),
    payer: {
      name: customer.name || undefined,
      email: customer.email || undefined
    },
    back_urls: {
      success: `${origin}/checkout?status=success`,
      failure: `${origin}/checkout?status=failure`,
      pending: `${origin}/checkout?status=pending`
    },
    auto_return: "approved",
    statement_descriptor: "STICKIT",
    external_reference: `stickit-${Date.now()}`,
    metadata: {
      customer_name: customer.name || "",
      customer_city: customer.city || ""
    }
  };

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(preferencePayload),
    cache: "no-store"
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data?.message || "No se pudo crear la preferencia de pago en Mercado Pago.", details: data },
      { status: response.status }
    );
  }

  return NextResponse.json({
    id: data.id,
    init_point: data.init_point,
    sandbox_init_point: data.sandbox_init_point
  });
}
