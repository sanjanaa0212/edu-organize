import { headers } from "next/headers";
import { auth } from "./config";
import { cache } from "react";

export const getServerAuth = cache(async () => {
  return await auth.api.getSession({ headers: await headers() });
});
