import { NextResponse } from "next/server";

import { getPanoramas } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json(getPanoramas());
}
