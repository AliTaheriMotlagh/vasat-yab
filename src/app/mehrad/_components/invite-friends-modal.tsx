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
import UserList from "./user-list";
import ModalFooter from "./selected-users-list";
import { useInvitedFriends } from "@/store/use-invited-friends";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InviteFriendsModalProp {
  children: React.ReactNode;
  users: User[];
}

const InviteFriendsModal = ({ children, users }: InviteFriendsModalProp) => {
  const { setInvitedFriends } = useInvitedFriends((state) => state);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  const closeBtn = useRef<HTMLDivElement>(null);

  const selectUser = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
  };

  const deselectUser = (user: User) => {
    setSelectedUsers(selectedUsers.filter((item) => item.id !== user.id));
  };

  const handleToggleSelectUser = (user: User) => {
    if (!selectedUsers.some((item) => item.id == user.id)) {
      selectUser(user);
    } else {
      deselectUser(user);
    }
  };

  const isUsersSelect = (userId: string): boolean => {
    return selectedUsers.some((item) => item.id == userId);
  };

  const onSubmit = () => {
    if (selectedUsers.length != 0) {
      setInvitedFriends(selectedUsers.map((item) => item.id));
    }
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
          <DrawerFooter className="flex h-16 w-full justify-center px-2 pb-0">
            <DrawerClose asChild>
              <div className="relative flex h-full w-full items-center justify-between py-4">
                <ModalFooter users={selectedUsers} />
                <Button className="h-14" onClick={onSubmit}>
                  Continue
                </Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InviteFriendsModal;
