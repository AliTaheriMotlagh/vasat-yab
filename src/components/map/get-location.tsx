"use client";

import { useCallback, useRef, useEffect, useState } from "react";

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

export const GetLocation = () => {
  const { coordinate, isCoordinateSet, updateCoordinate, removeCoordinate } =
    useCurrentLocation((state) => state);

  const user = useCurrentUser();

  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const initialViewState = {
    latitude: 48.85834534954358,
    longitude: 2.2945939729229936,
    zoom: 14,
  };
  const onMapDrag = useCallback((event: ViewState) => {
    setMarker({
      longitude: event.longitude,
      latitude: event.latitude,
    });
  }, []);

  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (isCoordinateSet) {
      updateCoordinate({
        latitude: marker.latitude,
        longitude: marker.longitude,
      });
    }
  }, [isCoordinateSet]);

  return (
    <>
      <div className=" flex flex-col gap-4">
        <div className="h-[400px] md:h-[600px]">
          <div className="h-full w-full">
            <Map
              doubleClickZoom={!isCoordinateSet}
              scrollZoom={!isCoordinateSet}
              dragPan={!isCoordinateSet}
              onMove={(evt) => onMapDrag(evt.viewState)}
              initialViewState={initialViewState}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              mapboxAccessToken={TOKEN}
              attributionControl={false}
            >
              {!isCoordinateSet && (
                <Marker
                  longitude={marker.longitude}
                  latitude={marker.latitude}
                  anchor="center"
                >
                  <Pin size={20} />
                </Marker>
              )}
              {isCoordinateSet && (
                <Marker
                  longitude={coordinate.longitude}
                  latitude={coordinate.latitude}
                  anchor="bottom"
                  style={{
                    backgroundImage: `url(${user?.image})`,
                    width: `60px`,
                    height: `60px`,
                    backgroundSize: "100%",
                    display: "block",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    padding: 0,
                  }}
                ></Marker>
              )}
              <GeolocateControl
                showAccuracyCircle={false}
                trackUserLocation={true}
                showUserHeading={true}
                position="bottom-right"
                ref={geoControlRef}
                style={{ borderRadius: "100px", padding: "5px" }}
              />
              <GeocoderControl mapboxAccessToken={TOKEN} position="top-right" />
            </Map>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                Are you absolutely sure this is your location?
              </CardTitle>
              <CardDescription>
                you are sharing it with your friend!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex">
                {!isCoordinateSet && (
                  <Button
                    onClick={() => {
                      updateCoordinate(marker);
                    }}
                    className="w-full transform rounded-lg bg-brand text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-light focus:outline-none focus:ring focus:ring-brand focus:ring-opacity-50 focus:ring-offset-2 sm:text-base"
                  >
                    <span>Use This Location</span>
                  </Button>
                )}
              </div>
              {isCoordinateSet && (
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={() => {
                      removeCoordinate();
                    }}
                    className="w-full transform rounded-lg bg-red-500 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 focus:ring-offset-2 sm:text-base"
                  >
                    <span>remove This Location</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
