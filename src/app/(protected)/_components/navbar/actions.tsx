import { UserButton } from "@/components/auth/user-button";

export const Actions = async () => {
  return (
    <div className="ml-4 flex items-center justify-end gap-x-2 lg:ml-0">
      <UserButton />
    </div>
  );
};
