import { getServerAuth } from "@/server/auth/server-sess";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const sess = await getServerAuth();
  const user = sess?.user;

  if (user) redirect("/dashboard");

  return <>{children}</>;
}
