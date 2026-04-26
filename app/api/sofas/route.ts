import { NextResponse } from "next/server";

import { getSofas } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json(getSofas());
}
