import React from "react";
import "./LogoAnimated.css";

export default function LogoAnimated({ variant = "dark" }) {
  const textColor = variant === "light" ? "white" : "#0f172a";
  const uniqueId = variant;

  return (
    <svg
      width="220"
      height="54"
      viewBox="0 0 200 52"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-animated"
    >
      <defs>
        {/* building gradient */}
        <linearGradient
          id={`b1-${uniqueId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#6366f1">
            <animate
              attributeName="stop-color"
              values="#6366f1;#8b5cf6;#6366f1"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#22d3ee">
            <animate
              attributeName="stop-color"
              values="#22d3ee;#06b6d4;#22d3ee"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        {/* land gradient */}
        <linearGradient id={`b2-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#84cc16" />
        </linearGradient>
      </defs>

      <g transform="translate(10,10)">
        {/* land */}
        <rect x="0" y="24" width="34" height="6" rx="3" fill={`url(#b2-${uniqueId})`} />

        {/* buildings with CSS animation */}
        <rect 
          className="building building-1"
          x="4" y="8" width="8" height="16" rx="2" 
          fill={`url(#b1-${uniqueId})`} 
        />
        <rect 
          className="building building-2"
          x="14" y="4" width="10" height="20" rx="2" 
          fill={`url(#b1-${uniqueId})`} 
        />
        <rect 
          className="building building-3"
          x="26" y="10" width="6" height="14" rx="2" 
          fill={`url(#b1-${uniqueId})`} 
        />
      </g>

      <text
        x="60"
        y="34"
        fontSize="22"
        fontWeight="700"
        fontFamily="Inter,Segoe UI,sans-serif"
        fill={textColor}
      >
        LandScope
      </text>
    </svg>
  );
}
