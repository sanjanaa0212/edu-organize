"use server";
import { authClient } from "@/server/auth";
import { db } from "@/server/db";

export const createOrganization = async ({
  name,
  email,
  password,
  phone,
}: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const res = await db.$transaction(async (tx) => {
    const user = await authClient.signUp.email({
      email,
      name,
      password,
    });

    const org = await tx.organization.create({
      data: {
        email,
        name,
      },
    });

    const updatedUser = await tx.user.update({
      where: {
        id: user.data?.user.id,
      },
      data: {
        phone,
        role: "ADMIN",
        organizationId: org.id,
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
