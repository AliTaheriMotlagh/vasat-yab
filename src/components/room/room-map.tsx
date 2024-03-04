"use client";

import { useRef, useMemo } from "react";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Pin from "@/components/map/mapgl/pin";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Room, RoomInfo, User } from "@prisma/client";
import Link from "next/link";

type RoomInfoWithUser = RoomInfo & {
  User: User;
};

interface RoomMapProps {
  room: Room;
  roomsInfo: RoomInfoWithUser[];
}
export const RoomMap = ({ room, roomsInfo }: RoomMapProps) => {
  const user = useCurrentUser();
  let mapLink = "";
  const myLocation = roomsInfo.find((item) => item.userId == user?.id);

  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  let initialViewState = {
    latitude: myLocation?.latitude,
    longitude: myLocation?.longitude,
    zoom: 14,
  };

  const pins = useMemo(
    () =>
      roomsInfo.map((item, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={item.longitude}
          latitude={item.latitude}
          anchor="center"
          style={{
            backgroundImage: `url(${item?.User.image})`,
            width: `60px`,
            height: `60px`,
            backgroundSize: "100%",
            display: "block",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Pin visible={false} />
        </Marker>
      )),
    [],
  );

  const vasat = useMemo(
    () => (
      <Marker
        key={`vasat`}
        longitude={room.vasatlongitude}
        latitude={room.vasatlatitude}
        anchor="center"
      >
        <Pin visible={room.isFinished} />
      </Marker>
    ),
    [],
  );

  if (room.isFinished) {
    mapLink = `https://maps.google.com/?q=${room.vasatlatitude},${room.vasatlongitude}`;
    initialViewState = {
      latitude: room.vasatlatitude,
      longitude: room.vasatlongitude,
      zoom: 9,
    };
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between ">
            <span>Time: {room.createdAt.toLocaleString()}</span>
            <span>Title: {room.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-col gap-4">
            <div className="h-[400px] md:h-[600px]">
              <div className="h-full w-full">
                <Map
                  initialViewState={initialViewState}
                  mapStyle="mapbox://styles/mapbox/streets-v12"
                  mapboxAccessToken={TOKEN}
                  attributionControl={false}
                >
                  {pins}
                  {vasat}
                </Map>
              </div>
            </div>
          </div>
        </CardContent>
        {room.isFinished && (
          <CardFooter>
            <Link
              href={mapLink}
              target="_blank"
              className=" inline-block w-full transform rounded-lg bg-brand px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-light focus:outline-none focus:ring focus:ring-brand focus:ring-opacity-50 focus:ring-offset-2 active:bg-brand-dark sm:text-base"
            >
              <span>Go</span>
            </Link>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
