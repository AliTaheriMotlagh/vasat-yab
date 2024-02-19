import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/share">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <img className="h-10" src="/img/logo.svg" alt="VasatYab" />
      </div>
    </Link>
  );
};