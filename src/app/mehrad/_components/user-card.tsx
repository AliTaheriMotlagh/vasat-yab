import { type User } from "@prisma/client";
import AvatarIcon from "./avatar-icon";
import { Check, Plus } from "lucide-react";

interface UserCardProp {
  user: User;
  checked: boolean;
  addFriendIcon?: boolean;
}

const UserCard = ({ user, checked, addFriendIcon = false }: UserCardProp) => {
  return (
    <>
      {user && (
        <div className="flex h-16 items-center justify-between bg-background py-1 pl-2 pr-5 hover:bg-secondary">
          <div className="flex items-center">
            <AvatarIcon src={user.image!} />
            <div className="ml-2 flex flex-col">
              <p className="font-bold">{user.name}</p>
              <span className="line-clamp-1">{user.email}</span>
            </div>
          </div>
          {checked && (
            <span>
              <Check />
            </span>
          )}
          {addFriendIcon && (
            <span>
              <Plus />
            </span>
          )}{" "}
          {/* TODO:make it reusable for add request too  */}
        </div>
      )}
    </>
  );
};

export default UserCard;
