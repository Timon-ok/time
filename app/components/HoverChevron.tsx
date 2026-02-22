"use client";

import { useEffect, useState } from "react";

const PROXIMITY_RADIUS = 160;

function distanceFromCorner(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

export default function HoverChevron() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dist = distanceFromCorner(e.clientX, e.clientY);
      setVisible(dist <= PROXIMITY_RADIUS);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "1.5rem",
        left: "1.5rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
}
