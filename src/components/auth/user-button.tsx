"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon, GearIcon, HandIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import Link from "next/link";
import { MailIcon, MapPinned } from "lucide-react";

export const UserButton = () => {
  const user = useCurrentUser();

  const onLogoutClick = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-auto" align="end">
        <Link href="/rooms" className="cursor-pointer">
          <DropdownMenuItem>
            <MapPinned className="mr-2 h-4 w-4" />
            <span>Rooms</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/notifications" className="cursor-pointer">
          <DropdownMenuItem>
            <MailIcon className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/friends" className="cursor-pointer">
          <DropdownMenuItem>
            <HandIcon className="mr-2 h-4 w-4" />
            <span>Friends</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/settings" className="cursor-pointer">
          <DropdownMenuItem>
            <GearIcon className="mr-2 h-4 w-4 " />
            <span>{user?.email}</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={onLogoutClick}>
          <ExitIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
