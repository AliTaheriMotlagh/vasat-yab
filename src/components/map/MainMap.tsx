"use client";
import { useState, useCallback } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import type { MarkerDragEvent, LngLat } from "react-map-gl";
import Pin from "@/components/map/pin";
import ControlPanel from "@/components/map/control-panel";
import { initialViewState, TOKEN } from "./main-map";

export default function MainMap() {
  const [marker, setMarker] = useState({
    latitude: 35.74822109417478,
    longitude: 51.186489879312425,
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  return (
    <main className="w-full h-full">
      <Map
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={TOKEN}>
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}>
          <Pin size={20} />
        </Marker>
        <GeolocateControl position="bottom-right" />
      </Map>
      <ControlPanel events={events} />
    </main>
  );
}
