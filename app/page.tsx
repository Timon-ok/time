"use client";

import { useEffect, useState } from "react";

export default function Home() {
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
          timeZone: "Europe/Zurich",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "Europe/Zurich",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "clamp(4rem, 16vw, 14rem)", fontWeight: 200, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
          {time}
        </div>
        <div style={{ fontSize: "clamp(1rem, 3vw, 2rem)", fontWeight: 300, color: "rgba(255,255,255,0.35)", marginTop: "1.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {date}
        </div>
      </div>
    </div>
  );
}
