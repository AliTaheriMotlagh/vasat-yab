"use client";

import { useState, useCallback } from "react";
import Map, { GeolocateControl, Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Pin from "@/components/map/pin";
import GeocoderControl from "@/components/map/geocoder-control";

export default function MainMap() {
  const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const initialViewState = {
    latitude: 35.74822109417478,
    longitude: 51.186489879312425,
    zoom: 14,
  };

  const [marker, setMarker] = useState({
    latitude: 35.74822109417478,
    longitude: 51.186489879312425,
  });

  const onMapDrag = useCallback((event: ViewState) => {
    setMarker({
      longitude: event.longitude,
      latitude: event.latitude,
    });
  }, []);

  return (
    <main className="w-full h-full">
      <Map
        onDrag={(evt) => onMapDrag(evt.viewState)}
        onZoom={(evt) => onMapDrag(evt.viewState)}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={TOKEN}>
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom">
          <Pin size={20} />
        </Marker>
        <GeolocateControl showAccuracyCircle={false} position="bottom-right" />
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
      </Map>
    </main>
  );
}
