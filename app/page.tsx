"use client";

import { useState } from "react";
import Clock from "./components/Clock";
import HoverChevron from "./components/HoverChevron";
import SettingsModal from "./components/SettingsModal";
import { ClockSettings, defaultSettings } from "./types/settings";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [settings, setSettings] = useState<ClockSettings>(defaultSettings);

  const updateSettings = (updated: Partial<ClockSettings>) =>
    setSettings((prev) => ({ ...prev, ...updated }));

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <HoverChevron onClick={() => setModalOpen((o) => !o)} />
      <SettingsModal
        open={modalOpen}
        settings={settings}
        onClose={() => setModalOpen(false)}
        onChange={updateSettings}
      />
      <Clock settings={settings} />
    </div>
  );
}
