import { Logo } from "./logo";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <header>
      <nav className="top-0 z-[49] flex h-20 w-full items-center justify-between px-2 shadow-sm lg:px-4">
        <Logo />
        <Actions />
      </nav>
    </header>
  );
};
