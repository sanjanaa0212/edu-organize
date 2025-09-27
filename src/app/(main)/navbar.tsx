import { UserDropdown } from "@/components/common/user-dropdown";
import { getServerAuth } from "@/server/auth/server-sess";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export async function Navbar() {
  const sess = await getServerAuth();
  const user = sess?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-8 w-8 text-primary-600" />
          Edu organize
        </Link>
        <div className="flex items-center gap-2">
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
