"use server";

import { getServerAuth } from "@/server/auth/server-sess";
import { forbidden, unauthorized } from "next/navigation";
import { setTimeout } from "node:timers/promises";

export async function deleteApplication() {
  const sess = await getServerAuth();
  const user = sess?.user;

  if (!user) unauthorized();

  if (user.role !== "admin") forbidden();

  // Delete app...

  await setTimeout(800);
}
