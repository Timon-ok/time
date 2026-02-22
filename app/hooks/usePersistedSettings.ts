"use client";

import { useEffect, useState } from "react";
import { ClockSettings, defaultSettings } from "../types/settings";

const STORAGE_KEY = "clock-settings";

function loadSettings(): ClockSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function usePersistedSettings() {
  const [settings, setSettings] = useState<ClockSettings>(defaultSettings);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const updateSettings = (updated: Partial<ClockSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return { settings, updateSettings };
}
