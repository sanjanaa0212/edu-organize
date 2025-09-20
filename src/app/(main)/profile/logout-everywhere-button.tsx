"use client";

import { LoadingButton } from "@/components/ui/button";
import { authClient } from "@/server/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LogoutEverywhereButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogoutEverywhere() {
    setLoading(true);

    const { error } = await authClient.revokeSessions();
    setLoading(false);

    if (error) {
      toast.error(error?.message ?? "Failed to logout everywhere !");
    } else {
      toast.success("Logout from all devices");
      router.push("/sign-in");
    }
  }

  return (
    <LoadingButton variant="destructive" onClick={handleLogoutEverywhere} loading={loading} className="w-full">
      Log out everywhere
    </LoadingButton>
  );
}
