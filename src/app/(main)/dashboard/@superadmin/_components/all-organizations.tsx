"use client";
import { getAllOrganizations } from "@/server/api/super-admin/actions";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

export function AllOrganizations() {
  const { data: allOrganizations } = useQuery({
    queryKey: ["all-organizations"],
    queryFn: getAllOrganizations,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="size-5" />
          Organizations Information
        </CardTitle>
        <CardDescription>Your current all organizations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {JSON.stringify(allOrganizations)}
          {/* <div className="flex flex-col items-center gap-3">
            <UserAvatar name={user.name} image={user.image} className="size-32 sm:size-24" />
            {user.role && (
              <Badge>
                <ShieldIcon className="size-3" />
                {user.role}
              </Badge>
            )}
          </div> */}

          {/* <div className="flex-1 space-y-4">
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
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
