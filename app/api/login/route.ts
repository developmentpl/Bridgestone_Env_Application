import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setLoginCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const phone = String(body?.phone ?? "").replace(/[\s-]/g, "");

  if (!name || name.length > 60) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!/^\+?\d{7,15}$/.test(phone)) {
    return NextResponse.json(
      { error: "Please enter a valid phone number (digits only)." },
      { status: 400 }
    );
  }

  // Phone number identifies the player — same number = same player, name gets updated.
  const user = await prisma.user.upsert({
    where: { phone },
    update: { name },
    create: { name, phone },
  });

  await setLoginCookie(user.id);
  return NextResponse.json({ ok: true, user: { id: user.id, name: user.name } });
}
