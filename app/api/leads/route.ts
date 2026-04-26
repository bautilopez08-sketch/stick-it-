import { NextResponse } from "next/server";

import { LeadPayload } from "@/types";

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload;

  if (!payload.name || !payload.company || !payload.email || !payload.phone || !payload.message) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
  }

  console.log("[Sofa360 lead]", payload);

  return NextResponse.json({
    success: true,
    leadId: `lead-${Date.now()}`,
    receivedAt: new Date().toISOString()
  });
}
