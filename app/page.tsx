"use client";

import { useState } from "react";
import Clock from "./components/Clock";
import HoverChevron from "./components/HoverChevron";
import SettingsModal from "./components/SettingsModal";
import { usePersistedSettings } from "./hooks/usePersistedSettings";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { settings, updateSettings } = usePersistedSettings();

  const isDark = settings.theme === "dark";

  return (
    <div
      style={{
        background: isDark ? "#000" : "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      <HoverChevron onClick={() => setModalOpen((o) => !o)} theme={settings.theme} />
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
