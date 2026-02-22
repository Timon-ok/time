"use client";

import { useEffect, useState } from "react";

const TZ = "Europe/Zurich";

export default function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("de-CH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: TZ,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: TZ,
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "clamp(4rem, 16vw, 14rem)",
          fontWeight: 200,
          color: "#fff",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {time}
      </div>
      <div
        style={{
          fontSize: "clamp(1rem, 3vw, 2rem)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.35)",
          marginTop: "1.5rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {date}
      </div>
    </div>
  );
}
