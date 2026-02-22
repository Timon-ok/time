"use client";

import { useEffect, useRef, useState } from "react";
import { ClockSettings, fontSizeMap, dateSizeMap } from "../types/settings";

interface Props {
  settings: ClockSettings;
}

export default function Clock({ settings }: Props) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const update = () => {
      const s = settingsRef.current;
      const now = new Date();
      setTime(
        now.toLocaleTimeString(s.hour12 ? "en-US" : "de-CH", {
          hour: "2-digit",
          minute: "2-digit",
          ...(s.showSeconds ? { second: "2-digit" } : {}),
          hour12: s.hour12,
          timeZone: s.timezone,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: s.timezone,
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", userSelect: "none" }}>
      <div
        style={{
          fontSize: fontSizeMap[settings.fontSize],
          fontWeight: 200,
          color: settings.theme === "dark" ? "#fff" : "#000",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          transition: "color 0.3s ease",
        }}
      >
        {time}
      </div>
      {settings.showDate && (
        <div
          style={{
            fontSize: dateSizeMap[settings.dateFontSize],
            fontWeight: 300,
            color: settings.theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
            marginTop: "1.5rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}
        >
          {date}
        </div>
      )}
    </div>
  );
}
