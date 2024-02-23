import { RoomMap } from "@/components/room/room-map";
import { currentUser } from "@/lib/auth";
import { getRoomBySlug, getRoomInfos } from "@/lib/room";

interface RoomCardProps {
  url: string;
}

const RoomCard = async ({ url }: RoomCardProps) => {
  const room = await getRoomBySlug(url);
  const roomInfos = await getRoomInfos(room?.id || "");
  return (
    <>{room && roomInfos && <RoomMap room={room} roomsInfo={roomInfos} />}</>
  );
};

export default RoomCard;
