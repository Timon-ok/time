"use client";

import { useEffect, useRef, useState } from "react";
import { ClockSettings, fontSizeMap, dateSizeMap } from "../types/settings";

interface Props {
  settings: ClockSettings;
}

function computeTime(s: ClockSettings): string {
  return new Date().toLocaleTimeString(s.hour12 ? "en-US" : "de-CH", {
    hour: "2-digit",
    minute: "2-digit",
    ...(s.showSeconds ? { second: "2-digit" } : {}),
    hour12: s.hour12,
    timeZone: s.timezone,
  });
}

export default function Clock({ settings }: Props) {
  const [displayTime, setDisplayTime] = useState("");
  const [date, setDate] = useState("");
  const [timeVisible, setTimeVisible] = useState(true);

  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const update = () => {
      const s = settingsRef.current;
      setDisplayTime(computeTime(s));
      setDate(new Date().toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: s.timezone,
      }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatKey = `${settings.showSeconds}-${settings.hour12}-${settings.timezone}`;
  const prevFormatKey = useRef(formatKey);
  useEffect(() => {
    if (prevFormatKey.current === formatKey) return;
    prevFormatKey.current = formatKey;
    setTimeVisible(false);
    const t = setTimeout(() => {
      setDisplayTime(computeTime(settingsRef.current));
      setTimeVisible(true);
    }, 150);
    return () => clearTimeout(t);
  }, [formatKey]);

  return (
    <div style={{ textAlign: "center", userSelect: "none" }}>
      <div
        style={{
          fontSize: fontSizeMap[settings.fontSize],
          fontWeight: 200,
          color: settings.theme === "dark" ? "#fff" : "#000",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          opacity: timeVisible ? 1 : 0,
          transform: timeVisible ? "translateY(0)" : "translateY(0.25rem)",
          transition: "font-size 0.4s ease, color 0.3s ease, opacity 0.14s ease, transform 0.14s ease",
        }}
      >
        {displayTime}
      </div>
      <div
        style={{
          fontSize: dateSizeMap[settings.dateFontSize],
          fontWeight: 300,
          color: settings.theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          overflow: "hidden",
          opacity: settings.showDate ? 1 : 0,
          maxHeight: settings.showDate ? "6rem" : "0",
          marginTop: settings.showDate ? "1.5rem" : "0",
          transform: settings.showDate ? "translateY(0)" : "translateY(-0.4rem)",
          transition: "font-size 0.4s ease, color 0.3s ease, opacity 0.35s ease, max-height 0.35s ease, margin-top 0.35s ease, transform 0.35s ease",
        }}
      >
        {date}
      </div>
    </div>
  );
}
