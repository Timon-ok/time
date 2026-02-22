"use client";

import { useEffect, useState } from "react";
import { ClockSettings, fontSizeMap, dateSizeMap } from "../types/settings";

const TZ = "Europe/Zurich";

interface Props {
  settings: ClockSettings;
}

export default function Clock({ settings }: Props) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(settings.hour12 ? "en-US" : "de-CH", {
          hour: "2-digit",
          minute: "2-digit",
          ...(settings.showSeconds ? { second: "2-digit" } : {}),
          hour12: settings.hour12,
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
  }, [settings.showSeconds, settings.hour12]);;

  return (
    <div style={{ textAlign: "center", userSelect: "none" }}>
      <div
        style={{
          fontSize: fontSizeMap[settings.fontSize],
          fontWeight: 200,
          color: "#fff",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {time}
      </div>
      {settings.showDate && (
        <div
          style={{
            fontSize: dateSizeMap[settings.dateFontSize],
            fontWeight: 300,
            color: "rgba(255,255,255,0.35)",
            marginTop: "1.5rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {date}
        </div>
      )}
    </div>
  );
}
