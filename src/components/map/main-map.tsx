"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Map, { GeolocateControl, LngLat, Marker, ViewState } from "react-map-gl";
import Pin from "@/components/map/pin";
import GeocoderControl from "@/components/map/geocoder-control";

import "mapbox-gl/dist/mapbox-gl.css";
import { useCurrentLocation } from "@/store/use-current-location";
import { useLocation } from "@/store/use-location";

export default function MainMap() {
  const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const initialViewState = {
    latitude: 48.85834534954358,
    longitude: 2.2945939729229936,
    zoom: 14,
  };

  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

  const onMapDrag = useCallback((event: ViewState) => {
    setMarker({
      longitude: event.longitude,
      latitude: event.latitude,
    });
  }, []);

  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);

  const updateCoordinate = useCurrentLocation(
    (state) => state.updateCoordinate
  );

  const { isSet, onCancel, onSet } = useLocation((state) => state);

  useEffect(() => {
    updateCoordinate({
      latitude: marker.latitude,
      longitude: marker.longitude,
    });
  }, [isSet]);
  //TODO maybe in one component should have all functionality and after being work split that

  return (
    <div className="w-full h-full">
      <Map
        dragPan={!isSet}
        onDrag={(evt) => onMapDrag(evt.viewState)}
        onZoom={(evt) => onMapDrag(evt.viewState)}
        onMove={(evt) => onMapDrag(evt.viewState)}
        onLoad={() => {
          geoControlRef.current?.trigger();
        }}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={TOKEN}
        attributionControl={false}>
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom">
          <Pin size={20} />
        </Marker>
        <GeolocateControl
          showAccuracyCircle={false}
          trackUserLocation={true}
          showUserHeading={true}
          position="bottom-right"
          ref={geoControlRef}
        />
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-right" />
      </Map>
    </div>
  );
}
