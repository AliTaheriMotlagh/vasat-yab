"use client";

import InviteFriendsModal from "./_components/invite-friends-modal";

const users = [
  {
    id: "1234567890",
    name: "John Doe",
    email: "johndoe@example.com",
    emailVerified: new Date("2023-01-15"),
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    password: "hashed_password_123", // In real applications, this would be a hashed password
    isTwoFactorEnabled: true,
  },
  {
    id: "0987654321",
    name: "Jane Smith",
    email: "janesmith@example.com",
    emailVerified: new Date("2023-02-20"),
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    password: "hashed_password_456", // In real applications, this would be a hashed password
    isTwoFactorEnabled: false,
  },
  {
    id: "1122334455",
    name: "Alex Johnson",
    email: "alexjohnson@example.com",
    emailVerified: new Date("2023-03-10"),
    image: "https://randomuser.me/api/portraits/med/men/98.jpg",
    password: "hashed_password_789",
    isTwoFactorEnabled: true,
  },
  {
    id: "11212455245",
    name: "Shahla sepehrzade",
    email: "alexjohnson@example.com",
    emailVerified: new Date("2023-03-10"),
    image: "https://randomuser.me/api/portraits/med/men/76.jpg",
    password: "hashed_password_789",
    isTwoFactorEnabled: true,
  },
  {
    id: "1122423540523",
    name: "mehrad amiri",
    email: "alexjohnson@example.com",
    emailVerified: new Date("2023-03-10"),
    image: "https://randomuser.me/api/portraits/med/men/77.jpg",
    password: "hashed_password_789",
    isTwoFactorEnabled: true,
  },
  {
    id: "11227347523",
    name: "kamand soheili",
    email: "alexjohnson@example.com",
    emailVerified: new Date("2023-03-10"),
    image: "https://randomuser.me/api/portraits/med/men/78.jpg",
    password: "hashed_password_789",
    isTwoFactorEnabled: true,
  },
  {
    id: "112273233423",
    name: "kamand soheili",
    email: "alexjohnson@example.com",
    emailVerified: new Date("2023-03-10"),
    image: "https://randomuser.me/api/portraits/med/men/90.jpg",
    password: "hashed_password_789",
    isTwoFactorEnabled: true,
  },
  {
    id: "212373233423",
    name: "kamand soheili",
    email: "alexjohnson@example.com",
    emailVerified: new Date("2023-03-10"),
    image: "https://randomuser.me/api/portraits/med/men/91.jpg",
    password: "hashed_password_789",
    isTwoFactorEnabled: true,
  },
];

const Page = () => {
  return (
    <>
      <InviteFriendsModal
        users={users}
        title="Create channel"
        description="all users in chanel are can see your location"
      >
        ⭐click
      </InviteFriendsModal>
    </>
  );
};

export default Page;
