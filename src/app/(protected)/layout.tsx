import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default ProtectedLayout;
