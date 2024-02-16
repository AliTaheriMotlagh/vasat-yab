import { useControl, ControlPosition } from "react-map-gl";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

type GeocoderControlProps = Omit<
  GeocoderOptions,
  "accessToken" | "mapboxgl" | "marker"
> & {
  mapboxAccessToken: string;

  position: ControlPosition;

  onLoading: (e: object) => void;
  onResults: (e: object) => void;
  onResult: (e: object) => void;
  onError: (e: object) => void;
};

export default function GeocoderControl(props: GeocoderControlProps) {
  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      });
      ctrl.on("loading", props.onLoading);
      ctrl.on("results", props.onResults);
      ctrl.on("result", (evt) => {
        props.onResult(evt);
      });
      ctrl.on("error", props.onError);
      return ctrl;
    },
    {
      position: props.position,
    }
  );
  return null;
}

const noop = () => {};

GeocoderControl.defaultProps = {
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
};
