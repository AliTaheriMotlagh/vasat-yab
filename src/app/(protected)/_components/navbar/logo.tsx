import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={DEFAULT_LOGIN_REDIRECT}>
      <div className="flex items-center gap-x-4 transition hover:opacity-75">
        <img className="h-10" src="/img/logo.svg" alt="VasatYab" />
      </div>
    </Link>
  );
};
