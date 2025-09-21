import { UserDropdown } from "@/components/common/user-dropdown";
import { getServerAuth } from "@/server/auth/server-sess";
import Link from "next/link";

export async function Navbar() {
  const sess = await getServerAuth();
  const user = sess?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <img
            src={"/media/coding_in_flow_logo.jpg"}
            alt="Coding in Flow logo"
            width={32}
            height={32}
            className="border-muted rounded-full border"
          />
          Better-Auth Tutorial
        </Link>
        <div className="flex items-center gap-2">
          {/* <ModeToggle /> */}
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
