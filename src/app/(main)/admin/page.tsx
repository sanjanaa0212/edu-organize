import type { Metadata } from "next";
import { DeleteApplication } from "./delete-application";
import { getServerAuth } from "@/server/auth/server-sess";
import { forbidden, unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const sess = await getServerAuth();
  const user = sess?.user;

  if (!user) return unauthorized();

  if (user.role !== "admin") forbidden();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-muted-foreground">You have administrator access.</p>
        </div>
        <DeleteApplication />
      </div>
    </main>
  );
}
