"use client";

import { ClockSettings, FontSize } from "../types/settings";

interface Props {
  open: boolean;
  settings: ClockSettings;
  onClose: () => void;
  onChange: (updated: Partial<ClockSettings>) => void;
}

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: () => void;
}

function ToggleRow({ label, description, value, onToggle }: ToggleRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        padding: "0.75rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div>
        <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 400 }}>{label}</div>
        {description && (
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: "0.15rem" }}>
            {description}
          </div>
        )}
      </div>
      <button
        onClick={onToggle}
        style={{
          flexShrink: 0,
          width: "2.5rem",
          height: "1.375rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: value ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
          position: "relative",
          transition: "background 0.2s ease",
          outline: "none",
        }}
        aria-pressed={value}
      >
        <span
          style={{
            position: "absolute",
            top: "0.1875rem",
            left: value ? "1.125rem" : "0.1875rem",
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            background: value ? "#000" : "rgba(255,255,255,0.5)",
            transition: "left 0.2s ease, background 0.2s ease",
          }}
        />
      </button>
    </div>
  );
}

export default function SettingsModal({ open, settings, onClose, onChange }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
          zIndex: 10,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: "4.5rem",
          left: "1.5rem",
          width: "18rem",
          background: "rgba(18,18,18,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0.75rem",
          padding: "1.25rem 1.5rem 1.5rem",
          backdropFilter: "blur(16px)",
          zIndex: 20,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-0.5rem) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Settings
        </div>

        <ToggleRow
          label="Show seconds"
          value={settings.showSeconds}
          onToggle={() => onChange({ showSeconds: !settings.showSeconds })}
        />
        <ToggleRow
          label="12-hour format"
          description="Adds AM / PM"
          value={settings.hour12}
          onToggle={() => onChange({ hour12: !settings.hour12 })}
        />
        <ToggleRow
          label="Show date"
          value={settings.showDate}
          onToggle={() => onChange({ showDate: !settings.showDate })}
        />

        {/* Size picker */}
        <div style={{ padding: "0.75rem 0 0" }}>
          <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 400, marginBottom: "0.6rem" }}>
            Clock size
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {(["sm", "md", "lg"] as FontSize[]).map((size) => {
              const active = settings.fontSize === size;
              const labels: Record<FontSize, string> = { sm: "Small", md: "Medium", lg: "Large" };
              return (
                <button
                  key={size}
                  onClick={() => onChange({ fontSize: size })}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0",
                    borderRadius: "0.4rem",
                    border: active ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    background: active ? "rgba(255,255,255,0.12)" : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.4)",
                    fontSize: "0.8rem",
                    fontWeight: active ? 500 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    outline: "none",
                  }}
                >
                  {labels[size]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
