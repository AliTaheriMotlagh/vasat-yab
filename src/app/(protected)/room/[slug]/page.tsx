import RoomCard from "@/components/room/room-card";
import { RoomMap } from "@/components/room/room-map";
import { currentUser } from "@/lib/auth";
import { getRoomBySlug } from "@/lib/room";

interface RoomPageProps {
  params: {
    slug: string;
  };
}

const RoomPage = async ({ params }: RoomPageProps) => {
  return (
    <>
      <RoomCard url={params.slug} />
    </>
  );
};

export default RoomPage;
