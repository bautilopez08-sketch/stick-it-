import { NextResponse } from "next/server";

import { getSofaById } from "@/lib/catalog";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sofa = getSofaById(id);

  if (!sofa) {
    return NextResponse.json({ message: "Sofa not found" }, { status: 404 });
  }

  return NextResponse.json(sofa);
}
