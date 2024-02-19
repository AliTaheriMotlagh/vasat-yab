import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarIcon from "./avatar-icon";
import { Check } from "lucide-react";

interface UserCardProp {
  userImageUrl: string;
  userName: string;
  userEmail: string;
  checked: boolean;
}

const UserCard = ({
  userEmail,
  userImageUrl,
  userName,
  checked,
}: UserCardProp) => {
  return (
    <>
      <div className="flex h-16 bg-background justify-between hover:bg-secondary pl-2 pr-5 py-1 items-center">
        <div className="flex items-center">
          <AvatarIcon src={userImageUrl} />
          <div className="flex flex-col ml-2">
            <p className="font-bold">{userName}</p>
            <span className="line-clamp-1">{userEmail}</span>
          </div>
        </div>
        {checked && <Check />}
      </div>
    </>
  );
};

export default UserCard;
