import { type User } from "@prisma/client";
import AvatarIcon from "./avatar-icon";

interface UserCardProp {
  user: User;
  children: React.ReactNode;
}

const UserCard = ({ user, children }: UserCardProp) => {
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
          {children}
        </div>
      )}
    </>
  );
};

export default UserCard;
