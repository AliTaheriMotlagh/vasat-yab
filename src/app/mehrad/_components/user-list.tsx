"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import UserCard from "./user-card";
import { User } from "@prisma/client";

interface UserListProp {
  users: User[];
  click: (user: User) => void;
  isUsersSelect: (userId: string) => boolean;
}

const UserList = ({ click, users, isUsersSelect }: UserListProp) => {
  return (
    <>
      <ScrollArea className="mt-3 flex h-[300px] w-full cursor-pointer flex-col">
        {users.map((user) => {
          return (
            <div
              onClick={() => {
                click(user);
              }}
              key={user.id}
            >
              <UserCard checked={isUsersSelect(user.id)} user={user} />
            </div>
          );
        })}
      </ScrollArea>
    </>
  );
};

export default UserList;
