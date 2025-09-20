import { headers } from "next/headers";
import { auth } from "./config";

export async function getServerAuth() {
  return await auth.api.getSession({ headers: await headers() });
}
