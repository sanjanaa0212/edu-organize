import type { Metadata } from "next";
import { EmailForm } from "./email-form";
import { LogoutEverywhereButton } from "./logout-everywhere-button";
import { PasswordForm } from "./password-form";
import { ProfileDetailsForm } from "./profile-details-form";
import { getServerAuth } from "@/server/auth/server-sess";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const sess = await getServerAuth();
  const user = sess?.user;

  if (!user) return unauthorized();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-muted-foreground">Update your account details, email, and password.</p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <ProfileDetailsForm user={user} />
          </div>
          <div className="flex-1 space-y-6">
            <EmailForm currentEmail={user.email} />
            <PasswordForm />
            <LogoutEverywhereButton />
          </div>
        </div>
      </div>
    </main>
  );
}
