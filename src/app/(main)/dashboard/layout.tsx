import { getServerAuth } from "@/server/auth/server-sess";
import { unauthorized } from "next/navigation";

export default async function Layout({
  children,
  admin,
  student,
  superadmin,
  teacher,
}: {
  children: React.ReactNode;
  superadmin: React.ReactNode;
  admin: React.ReactNode;
  teacher: React.ReactNode;
  student: React.ReactNode;
}) {
  const sess = await getServerAuth();
  const user = sess?.user;

  if (!user) unauthorized();

  if (user.role === "SUPERADMIN") return <>{superadmin}</>;

  if (user.role === "ADMIN") return <>{admin}</>;

  if (user.role === "TEACHER") return <>{teacher}</>;

  if (user.role === "STUDENT") return <>{student}</>;
}
