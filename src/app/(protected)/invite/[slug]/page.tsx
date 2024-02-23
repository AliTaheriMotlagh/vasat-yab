import { InviteCard } from "@/components/invite/invite-card";
import { getRoomBySlug } from "@/lib/room";
import { notFound } from "next/navigation";

interface IInviteProps {
  params: {
    slug: string;
  };
}

const InvitePage = async ({ params }: IInviteProps) => {
  const room = await getRoomBySlug(params.slug);
  if (!room) {
    notFound();
  }
  return <InviteCard />;
};

export default InvitePage;
