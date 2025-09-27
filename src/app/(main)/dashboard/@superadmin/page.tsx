import { UserAvatar } from "@/components/common/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/server/auth/config";
import { getServerAuth } from "@/server/auth/server-sess";
import { format } from "date-fns";
import { CalendarDaysIcon, ShieldIcon, UserIcon } from "lucide-react";
import type { Metadata } from "next";
import { AllOrganizations } from "./_components/all-organizations";
import { CreateOrgForm } from "./_components/create-org-form";

export const metadata: Metadata = {
  title: "Super Admin",
};

export default async function DashboardPage() {
  const sess = await getServerAuth();
  const user = sess?.user;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back super admin! Here&apos;s your account overview.</p>
        </div>
        <ProfileInformation user={user} />
        <AllOrganizations />
        <CreateOrgForm />
      </div>
    </main>
  );
}

function ProfileInformation({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="size-5" />
          Profile Information
        </CardTitle>
        <CardDescription>Your account details and current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3">
            <UserAvatar name={user.name} image={user.image} className="size-32 sm:size-24" />
            {user.role && (
              <Badge>
                <ShieldIcon className="size-3" />
                {user.role}
              </Badge>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <CalendarDaysIcon className="size-4" />
                Member Since
              </div>
              <p className="font-medium">{format(user.createdAt, "MMMM d, yyyy")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
