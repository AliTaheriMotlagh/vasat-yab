import { User } from "@prisma/client";
import AvatarIcon from "./avatar-icon";
import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  selectedUsers: string[];
  onSubmit: () => void;
  getUserInfo: (arg: string) => User;
}

const ModalFooter = ({
  onSubmit,
  selectedUsers,
  getUserInfo,
}: ModalFooterProps) => {
  const maxVisibleUser = 5;
  return (
    <>
      <div className="relative flex h-full w-full items-center justify-between py-4">
        <div className="flex">
          {selectedUsers.slice(0, maxVisibleUser).map((userId) => {
            return (
              <AvatarIcon
                src={getUserInfo(userId)?.image!}
                key={userId}
                className="-mr-5 border-4 border-background"
              />
            );
          })}
          {selectedUsers.length > maxVisibleUser && (
            <>
              <div className="z-50 flex h-14  w-14 items-center justify-center rounded-full bg-slate-200">
                + {selectedUsers.length - maxVisibleUser}
              </div>
            </>
          )}
        </div>
        <Button className="h-14" onClick={onSubmit}>
          Continue
        </Button>
      </div>
    </>
  );
};

export default ModalFooter;
