"use client";

import { SearchUserForm } from "@/components/friend/search-user-form";
import { MyFriendsCard } from "@/components/friend/my-friends-card";

export const FriendsCard = () => {
  return (
    <>
      <div className="grid  gap-4 lg:grid-cols-3">
        <SearchUserForm />
        <MyFriendsCard />
      </div>
    </>
  );
};
