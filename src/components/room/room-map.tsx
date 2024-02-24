"use client";

import {
  useCallback,
  useRef,
  useEffect,
  useState,
  startTransition,
  useMemo,
} from "react";

import Map, { GeolocateControl, Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Pin from "@/components/map/mapgl/pin";
import GeocoderControl from "@/components/map/mapgl/geocoder-control";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useCurrentLocation } from "@/store/use-current-location";
import { Room, RoomInfo, User } from "@prisma/client";

type RoomInfoWithUser = RoomInfo & {
  User: User;
};

interface RoomMapProps {
  room: Room;
  roomsInfo: RoomInfoWithUser[];
}
export const RoomMap = ({ room, roomsInfo }: RoomMapProps) => {
  const user = useCurrentUser();

  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const initialViewState = {
    latitude: 48.85834534954358,
    longitude: 2.2945939729229936,
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{room.title}</CardTitle>
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
      </Card>
    </>
  );
};
