"use server";
import { authClient } from "@/server/auth";
import { db } from "@/server/db";

export const createOrganization = async ({ name, email, phone }: { name: string; email: string; phone: string }) => {
  const res = await db.$transaction(async (tx) => {
    const org = await tx.organization.create({
      data: {
        email,
        name,
        phone,
      },
    });

    return org;
  });

  return res;
};

export const createAdminForOrg = async ({
  name,
  email,
  password,
  phone,
  orgId,
}: {
  name: string;
  email: string;
  password: string;
  phone: string;
  orgId: string;
}) => {
  const user = await authClient.signUp.email({
    email,
    name,
    password,
  });
  console.log("USER:" + user);
  const res = await db.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: {
        id: user.data?.user.id,
      },
      data: {
        phone,
        role: "ADMIN",
        organizationId: orgId,
      },
    });

    return updatedUser;
  });

  return res;
};

export const getAllOrganizations = async () => {
  const orgs = await db.organization.findMany();
  return orgs;
};

export const deleteOrganization = async (id: string) => {
  const org = await db.organization.delete({
    where: {
      id,
    },
  });

  return org;
};

export const getAdminsOrgById = async (id: string) => {
  const org = await db.user.findMany({
    where: {
      organizationId: id,
      role: "ADMIN",
    },
  });

  return org;
};
