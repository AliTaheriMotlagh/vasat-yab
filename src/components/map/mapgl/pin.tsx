import * as React from "react";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

interface PinProps {
  visible?: boolean;
}

export default function Pin(props: PinProps) {
  const { visible = true } = props;

  const pinStyle = {
    fill: "#d00",
    stroke: "none",
    zIndex: 3000,
    display: `${visible ? "block" : "none"}`,
  };

  return (
    <svg height="41px" width="31px" viewBox="0 0 31 41" style={pinStyle}>
      <defs>
        <radialGradient id="shadowGradient">
          <stop offset="10%" stop-opacity="0.4"></stop>
          <stop offset="100%" stop-opacity="0.05"></stop>
        </radialGradient>
      </defs>
      <ellipse
        cx="13.5"
        cy="34.8"
        rx="10.5"
        ry="5.25"
        fill="url(#shadowGradient)"
      ></ellipse>
      <path d={ICON} />
      <ellipse
        cx="13.5"
        cy="34.8"
        rx="10.5"
        ry="5.25"
        fill="url(#shadowGradient)"
      ></ellipse>
    </svg>
  );
}
