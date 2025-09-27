"use client";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { UserAvatar } from "@/components/common/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteOrganization, getAdminsOrgById, getAllOrganizations } from "@/server/api/super-admin/actions";
import type { Organization } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDaysIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { CreateAdminOrgForm } from "./create-admin-for-org";

export function AllOrganizations() {
  const { data: allOrganizations } = useQuery({
    queryKey: ["all-organizations"],
    queryFn: getAllOrganizations,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrganization,
  });

  const [deleteOpen, setDeleteOpen] = useState(false);

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
        {allOrganizations?.map((org) => (
          <div key={org.id} className="flex flex-col gap-4 sm:flex-row sm:items-start group">
            <div className="flex flex-col items-center gap-3">
              <UserAvatar name={org.name} image={org.logo} className="size-16" />
            </div>

            <div className="flex justify-between w-full">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{org.name}</h3>
                  <p className="text-muted-foreground">{org.email}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <CalendarDaysIcon className="size-4" />
                    Created on
                  </div>
                  <p className="font-medium">{format(org.createdAt, "MMMM d, yyyy")}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {org && (
                  <ViewAdminsDialog org={org}>
                    <Button size={"sm"}>View Admins</Button>
                  </ViewAdminsDialog>
                )}
                <ConfirmationDialog
                  open={deleteOpen}
                  setOpen={setDeleteOpen}
                  type="warning"
                  title="Delete Organization"
                  description="Are you sure you want to delete this org?"
                  actionButtonText="Delete"
                  functionToBeExecuted={() => {
                    deleteMutation.mutate(org.id);
                    setDeleteOpen(false);
                  }}
                  loading={deleteMutation.isPending}
                >
                  <Button size={"sm"} variant={"destructive"}>
                    Delete
                  </Button>
                </ConfirmationDialog>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export const ViewAdminsDialog = ({ org, children }: { org: Organization; children: React.ReactNode }) => {
  const { data: orgAdmins } = useQuery({
    queryKey: ["get-org-details", org.id],
    queryFn: async () => await getAdminsOrgById(org.id),
  });
  const [open, setOpen] = useState(false);
  return (
    <Dialog key={"saf"}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>All Admins</DialogTitle>
          <DialogDescription>
            Admin View
            <br />
            <br />
            <CreateAdminForm orgId={org.id} open={open} setOpen={setOpen}>
              <Button>Create New Admin</Button>
            </CreateAdminForm>
          </DialogDescription>
        </DialogHeader>
        orgAdmins
        <pre className="w-full overflow-auto text-wrap border">{JSON.stringify(orgAdmins, null, 2)}</pre>
        orgInfo
        <pre className="w-full overflow-auto text-wrap border">{JSON.stringify(org, null, 2)}</pre>
      </DialogContent>
    </Dialog>
  );
};

export const CreateAdminForm = ({
  children,
  orgId,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  orgId: string;
  open: boolean;
  setOpen: (o: boolean) => void;
}) => {
  return (
    <Dialog key={"create-admin-form"} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create admin</DialogTitle>
          <DialogDescription>create new admin</DialogDescription>
        </DialogHeader>
        <CreateAdminOrgForm orgId={orgId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
