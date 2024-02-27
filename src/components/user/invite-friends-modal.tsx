"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { type User } from "@prisma/client";
import { useRef, useState } from "react";
import UserList from "@/components/user/user-list";
import { useInvitedFriends } from "@/store/use-invited-friends";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InviteFriendsModalProp {
  children: React.ReactNode;
  users: User[];
}

const InviteFriendsModal = ({ children, users }: InviteFriendsModalProp) => {
  const { invitedFriends, setInvitedFriends } = useInvitedFriends(
    (state) => state,
  );
  const [open, setOpen] = useState(false);

  const closeBtn = useRef<HTMLDivElement>(null);

  const selectUser = (user: User) => {
    setInvitedFriends([...invitedFriends, user]);
  };

  const deselectUser = (user: User) => {
    setInvitedFriends(invitedFriends.filter((item) => item.id !== user.id));
  };

  const handleToggleSelectUser = (user: User) => {
    if (!invitedFriends.some((item) => item.id == user.id)) {
      selectUser(user);
    } else {
      deselectUser(user);
    }
  };

  const isUsersSelect = (userId: string): boolean => {
    return invitedFriends.some((item) => item.id == userId);
  };

  const onSubmit = () => {
    closeBtn.current?.click();
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div ref={closeBtn}>{children}</div>
        </DrawerTrigger>
        <DrawerContent className="px-0 pb-2 pt-4">
          <DrawerHeader className="px-5">
            <DrawerTitle>Add Friend</DrawerTitle>
            <DrawerDescription>
              not in list?add <Link href="/friends">new friend</Link>
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-3 flex w-full flex-col">
            <div className="flex items-center gap-x-2 border-y-[3px] px-4 py-3">
              <Search />
              <Input
                placeholder="Search users"
                className="border-0 text-lg shadow-none focus:outline-0 focus-visible:ring-0"
                autoComplete="off"
              />
            </div>
            <UserList
              click={handleToggleSelectUser}
              isUsersSelect={isUsersSelect}
              users={users}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="h-full w-full" onClick={onSubmit}>
                Continue
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InviteFriendsModal;
