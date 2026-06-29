import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setLoginCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const employeeId = String(body?.employeeId ?? "").trim();
  const phone = String(body?.phone ?? "").replace(/[\s-]/g, "");

  if (!name || name.length > 60) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!employeeId || employeeId.length > 60) {
    return NextResponse.json(
      { error: "Please enter your employee ID." },
      { status: 400 }
    );
  }
  if (!/^\+?\d{7,15}$/.test(phone)) {
    return NextResponse.json(
      { error: "Please enter a valid mobile number (digits only)." },
      { status: 400 }
    );
  }

  const user = await prisma.user.upsert({
    where: { employeeId },
    update: { name, phone },
    create: { name, employeeId, phone },
  });

  await setLoginCookie(user.id);
  return NextResponse.json({ ok: true, user: { id: user.id, name: user.name } });
}
