"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import UserCard from "./user-card";
import AvatarIcon from "./avatar-icon";
import { Button } from "@/components/ui/button";
import { type User } from "@prisma/client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "usehooks-ts";

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
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const maxVisibleUser = 5;

  const handleClickOnUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((item) => item !== userId));
    } else setSelectedUsers([...selectedUsers, userId]);
  };

  return (
    <>
      {isDesktop ? (
        <Dialog
          onOpenChange={() => {
            setSelectedUsers([]);
          }}
        >
          <DialogTrigger>{children}</DialogTrigger>
          <DialogContent className="px-0 pb-0 pt-4">
            <DialogHeader className="px-5">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="mt-3 flex w-full flex-col">
              <div className="flex items-center gap-x-2 border-y-[3px] px-4 py-3">
                <Button variant={"ghost"}>
                  <Search />
                </Button>

                <Input
                  placeholder="Search users"
                  className="border-0 text-lg shadow-none focus:outline-0 focus-visible:ring-0"
                  autoComplete="off"
                />
              </div>
              <ScrollArea className="mt-3 flex h-[300px] w-full cursor-pointer flex-col">
                {users.map((user) => {
                  return (
                    <div
                      onClick={() => {
                        handleClickOnUser(user.id);
                      }}
                      key={user.id}
                    >
                      <UserCard
                        checked={selectedUsers.includes(user.id)}
                        userName={user.name!}
                        userEmail={user.email!}
                        userImageUrl={user.image!}
                      />
                    </div>
                  );
                })}
              </ScrollArea>
            </div>
            <DialogFooter className="flex h-16 w-full justify-center px-2 pb-0">
              <div className="relative flex h-full w-full items-center justify-between py-4">
                <div className="flex">
                  {users
                    .filter(
                      (item, idx) => selectedUsers.includes(item.id) && idx < 5,
                    )
                    .map((user) => {
                      return (
                        <AvatarIcon
                          src={user.image!}
                          className="-mr-5 border-4 border-background"
                        />
                      );
                    })}
                  {selectedUsers.length > 5 && (
                    <>
                      <div className="z-50 flex h-14  w-14 items-center justify-center rounded-full bg-slate-200">
                        +{selectedUsers.length - 5}
                      </div>
                    </>
                  )}
                </div>
                <Button className="h-14">Continue</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer onClose={() => setSelectedUsers([])}>
          <DrawerTrigger>{children}</DrawerTrigger>
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
              <ScrollArea className="mt-3 flex h-[300px] w-full cursor-pointer flex-col">
                {users.map((user) => {
                  return (
                    <div
                      onClick={() => {
                        handleClickOnUser(user.id);
                      }}
                      key={user.id}
                    >
                      <UserCard
                        checked={selectedUsers.includes(user.id)}
                        userName={user.name!}
                        userEmail={user.email!}
                        userImageUrl={user.image!}
                      />
                    </div>
                  );
                })}
              </ScrollArea>
            </div>
            <DrawerFooter className="flex h-16 w-full justify-center px-2 pb-0">
              <div className="relative flex h-full w-full items-center justify-between py-4">
                <div className="flex">
                  {users
                    .filter(
                      (item, idx) =>
                        selectedUsers.includes(item.id) && idx < maxVisibleUser,
                    )
                    .map((user) => {
                      return (
                        <AvatarIcon
                          src={user.image!}
                          className="-mr-5 border-4 border-background"
                        />
                      );
                    })}
                  {selectedUsers.length > maxVisibleUser && (
                    <>
                      <div className="z-50 flex h-14  w-14 items-center justify-center rounded-full bg-slate-200">
                        +{selectedUsers.length - maxVisibleUser}
                      </div>
                    </>
                  )}
                </div>
                <Button className="h-14">Continue</Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default InviteFriendsModal;
