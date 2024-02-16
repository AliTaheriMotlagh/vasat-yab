"use client";

import Map, { GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MainMap() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <main className="w-full h-full">
      <Map
        initialViewState={{
          longitude: 51.18597485758865,
          latitude: 35.74814619635703,
          zoom: 14,
        }}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12">
        <NavigationControl position="top-left" />
        <GeolocateControl position="top-left" />
      </Map>
    </main>
  );
}
