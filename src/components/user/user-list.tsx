"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import UserCard from "@/components/user/user-card";
import { User } from "@prisma/client";
import { Check } from "lucide-react";

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
              <UserCard user={user}>
                {isUsersSelect(user.id) && <Check />}
              </UserCard>
            </div>
          );
        })}
      </ScrollArea>
    </>
  );
};

export default UserList;
