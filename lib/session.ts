// Demo auth: an httpOnly cookie holding the user's id (a cuid — unguessable).
// Phase 2 replaces this with Auth.js + Google SSO; keep the call sites the same.

import { cookies } from "next/headers";
import { prisma } from "./prisma";

const COOKIE_NAME = "ll_uid";

export async function setLoginCookie(userId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearLoginCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const store = await cookies();
  const uid = store.get(COOKIE_NAME)?.value;
  if (!uid) return null;
  return prisma.user.findUnique({ where: { id: uid } });
}
