"use client";

import { SearchUserForm } from "./search-user-form";
import { MyFriendsCard } from "./my-friends-card";
import { FriendRequestsCard } from "./friend-requests-card";

export const FriendsCard = () => {
  return (
    <>
      <div className="grid  gap-4 lg:grid-cols-3">
        <FriendRequestsCard />
        <SearchUserForm />
        <MyFriendsCard />
      </div>
    </>
  );
};
