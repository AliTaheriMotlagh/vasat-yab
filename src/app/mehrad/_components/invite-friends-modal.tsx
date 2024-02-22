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
import UserCard from "./user-card";
import AvatarIcon from "./avatar-icon";
import { Button } from "@/components/ui/button";
import { type User } from "@prisma/client";
import { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserList from "./user-list";
import SelectedUsersList from "./selected-users-list";
import ModalFooter from "./selected-users-list";

interface InviteFriendsModalProp {
  children: React.ReactNode;
  title: string;
  description?: string;
  users: User[];
}

const InviteFriendsModal = ({
  children,
  title,
  description,
  users,
}: InviteFriendsModalProp) => {
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLDivElement>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const selectUser = (userId: string) => {
    setSelectedUsers([...selectedUsers, userId]);
  };

  const deselectUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((item) => item !== userId));
  };

  const handleToggleSelectUser = (userId: string) => {
    if (!selectedUsers.includes(userId)) {
      selectUser(userId);
    } else {
      deselectUser(userId);
    }
  };

  const isUsersSelect = (userId: string): boolean => {
    return selectedUsers.includes(userId);
  };

  const getUserInfo = (userId: string): User => {
    const user = users.find((i) => i.id === userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  };

  const onSubmit = () => {
    closeBtn.current?.click();
  };

  return (
    <>
      {/* TODO: had to delete dialog,fix it latter */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div ref={closeBtn}>{children}</div>
        </DrawerTrigger>
        <DrawerContent className="px-0 pb-2 pt-4">
          <DrawerHeader className="px-5">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
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
              <ModalFooter
                getUserInfo={getUserInfo}
                onSubmit={onSubmit}
                selectedUsers={selectedUsers}
              />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InviteFriendsModal;
