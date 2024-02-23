import { User } from "@prisma/client";
import AvatarIcon from "./avatar-icon";

interface SelectedUserListProps {
  users: User[];
}

const SelectedUserList = ({ users }: SelectedUserListProps) => {
  const maxVisibleUser = 5;
  return (
    <>
      <div className="flex">
        {users.slice(0, maxVisibleUser).map((item) => {
          return (
            <AvatarIcon
              src={item?.image!}
              key={item.id}
              className="-mr-5 border-4 border-background"
            />
          );
        })}
        {users.length > maxVisibleUser && (
          <>
            <div className="z-50 flex h-14  w-14 items-center justify-center rounded-full bg-slate-200">
              + {users.length - maxVisibleUser}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SelectedUserList;
