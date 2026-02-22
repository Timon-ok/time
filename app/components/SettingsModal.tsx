"use client";

import { useState } from "react";
import { ClockSettings, FontSize, Theme, TIMEZONE_OPTIONS } from "../types/settings";

interface Props {
  open: boolean;
  settings: ClockSettings;
  onClose: () => void;
  onChange: (updated: Partial<ClockSettings>) => void;
}

interface Colors {
  text: string; textMuted: string; textFaint: string; divider: string;
  toggleOn: string; toggleOff: string; toggleThumb: string;
  sizeActiveBorder: string; sizeInactiveBorder: string; sizeActiveBg: string;
  sizeActiveText: string; sizeInactiveText: string;
  navBorder: string; navBg: string;
  tzActiveBg: string; tzActiveText: string; tzInactiveText: string;
}

function getColors(isDark: boolean): Colors {
  return isDark ? {
    text: "#fff", textMuted: "rgba(255,255,255,0.4)", textFaint: "rgba(255,255,255,0.35)",
    divider: "rgba(255,255,255,0.06)",
    toggleOn: "rgba(255,255,255,0.85)", toggleOff: "rgba(255,255,255,0.15)", toggleThumb: "#000",
    sizeActiveBorder: "rgba(255,255,255,0.5)", sizeInactiveBorder: "rgba(255,255,255,0.1)",
    sizeActiveBg: "rgba(255,255,255,0.12)", sizeActiveText: "#fff", sizeInactiveText: "rgba(255,255,255,0.4)",
    navBorder: "rgba(255,255,255,0.08)", navBg: "rgba(255,255,255,0.04)",
    tzActiveBg: "rgba(255,255,255,0.1)", tzActiveText: "#fff", tzInactiveText: "rgba(255,255,255,0.55)",
  } : {
    text: "#111", textMuted: "rgba(0,0,0,0.4)", textFaint: "rgba(0,0,0,0.35)",
    divider: "rgba(0,0,0,0.07)",
    toggleOn: "rgba(0,0,0,0.75)", toggleOff: "rgba(0,0,0,0.12)", toggleThumb: "#fff",
    sizeActiveBorder: "rgba(0,0,0,0.45)", sizeInactiveBorder: "rgba(0,0,0,0.1)",
    sizeActiveBg: "rgba(0,0,0,0.08)", sizeActiveText: "#111", sizeInactiveText: "rgba(0,0,0,0.35)",
    navBorder: "rgba(0,0,0,0.08)", navBg: "rgba(0,0,0,0.03)",
    tzActiveBg: "rgba(0,0,0,0.07)", tzActiveText: "#111", tzInactiveText: "rgba(0,0,0,0.5)",
  };
}

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: () => void;
  c: Colors;
}

function ToggleRow({ label, description, value, onToggle, c }: ToggleRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        padding: "0.75rem 0",
        borderBottom: `1px solid ${c.divider}`,
      }}
    >
      <div>
        <div style={{ color: c.text, fontSize: "0.9rem", fontWeight: 400 }}>{label}</div>
        {description && (
          <div style={{ color: c.textFaint, fontSize: "0.75rem", marginTop: "0.15rem" }}>
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
          background: value ? c.toggleOn : c.toggleOff,
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
            background: value ? c.toggleThumb : "rgba(128,128,128,0.5)",
            transition: "left 0.2s ease, background 0.2s ease",
          }}
        />
      </button>
    </div>
  );
}

function SizePicker({ value, onChange, c }: { value: FontSize; onChange: (s: FontSize) => void; c: Colors }) {
  const labels: Record<FontSize, string> = { sm: "Small", md: "Medium", lg: "Large" };
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {(["sm", "md", "lg"] as FontSize[]).map((size) => {
        const active = value === size;
        return (
          <button
            key={size}
            onClick={() => onChange(size)}
            style={{
              flex: 1,
              padding: "0.4rem 0",
              borderRadius: "0.4rem",
              border: `1px solid ${active ? c.sizeActiveBorder : c.sizeInactiveBorder}`,
              background: active ? c.sizeActiveBg : "transparent",
              color: active ? c.sizeActiveText : c.sizeInactiveText,
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
  );
}

function ThemePicker({ value, onChange, c }: { value: Theme; onChange: (t: Theme) => void; c: Colors }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {(["dark", "light"] as Theme[]).map((t) => {
        const active = value === t;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            style={{
              flex: 1,
              padding: "0.4rem 0",
              borderRadius: "0.4rem",
              border: `1px solid ${active ? c.sizeActiveBorder : c.sizeInactiveBorder}`,
              background: active ? c.sizeActiveBg : "transparent",
              color: active ? c.sizeActiveText : c.sizeInactiveText,
              fontSize: "0.8rem",
              fontWeight: active ? 500 : 400,
              cursor: "pointer",
              transition: "all 0.15s ease",
              outline: "none",
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

// Chevron icons
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export default function SettingsModal({ open, settings, onClose, onChange }: Props) {
  const [page, setPage] = useState<"main" | "timezone">("main");
  const isDark = settings.theme === "dark";
  const c = getColors(isDark);
  const panelBg = isDark ? "rgba(18,18,18,0.95)" : "rgba(245,245,245,0.97)";
  const panelBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const currentTzLabel = TIMEZONE_OPTIONS.find((t) => t.value === settings.timezone)?.label ?? settings.timezone;

  const handleBackdropClick = () => {
    onClose();
    setTimeout(() => setPage("main"), 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
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
          background: panelBg,
          border: `1px solid ${panelBorder}`,
          borderRadius: "0.75rem",
          backdropFilter: "blur(16px)",
          zIndex: 20,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-0.5rem) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease, background 0.3s ease",
          overflow: "hidden",
        }}
      >
        {/* Sliding track */}
        <div
          style={{
            display: "flex",
            width: "200%",
            transform: page === "timezone" ? "translateX(-50%)" : "translateX(0)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* ── Main page ── */}
          <div style={{ width: "50%", padding: "1.25rem 1.5rem 1.5rem", flexShrink: 0 }}>
            <div
              style={{
                color: c.textMuted,
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Settings
            </div>

            <ToggleRow label="Show seconds" value={settings.showSeconds} onToggle={() => onChange({ showSeconds: !settings.showSeconds })} c={c} />
            <ToggleRow label="12-hour format" description="Adds AM / PM" value={settings.hour12} onToggle={() => onChange({ hour12: !settings.hour12 })} c={c} />
            <ToggleRow label="Show date" value={settings.showDate} onToggle={() => onChange({ showDate: !settings.showDate })} c={c} />

            {/* Size pickers */}
            <div style={{ padding: "0.75rem 0 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <div style={{ color: c.text, fontSize: "0.9rem", fontWeight: 400, marginBottom: "0.5rem" }}>Time size</div>
                <SizePicker value={settings.fontSize} onChange={(s) => onChange({ fontSize: s })} c={c} />
              </div>
              <div>
                <div style={{ color: c.text, fontSize: "0.9rem", fontWeight: 400, marginBottom: "0.5rem" }}>Date size</div>
                <SizePicker value={settings.dateFontSize} onChange={(s) => onChange({ dateFontSize: s })} c={c} />
              </div>
              <div>
                <div style={{ color: c.text, fontSize: "0.9rem", fontWeight: 400, marginBottom: "0.5rem" }}>Theme</div>
                <ThemePicker value={settings.theme} onChange={(t) => onChange({ theme: t })} c={c} />
              </div>

              {/* Timezone nav row */}
              <button
                onClick={() => setPage("timezone")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0.55rem 0.7rem",
                  borderRadius: "0.4rem",
                  border: `1px solid ${c.navBorder}`,
                  background: c.navBg,
                  color: c.text,
                  cursor: "pointer",
                  outline: "none",
                  transition: "background 0.15s ease",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 400 }}>Timezone</div>
                  <div style={{ fontSize: "0.75rem", color: c.textMuted, marginTop: "0.1rem" }}>{currentTzLabel}</div>
                </div>
                <span style={{ color: c.textMuted, display: "flex" }}><ChevronRight /></span>
              </button>
            </div>
          </div>

          {/* ── Timezone page ── */}
          <div style={{ width: "50%", flexShrink: 0, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "1.25rem 1.5rem 0.75rem", borderBottom: `1px solid ${c.divider}` }}>
              <button
                onClick={() => setPage("main")}
                style={{ background: "none", border: "none", color: c.text, cursor: "pointer", padding: "0.1rem", display: "flex", outline: "none" }}
              >
                <ChevronLeft />
              </button>
              <span style={{ color: c.textMuted, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Timezone
              </span>
            </div>

            {/* List */}
            <div style={{ overflowY: "auto", maxHeight: "24rem", padding: "0.5rem 0 0.75rem" }} className="tz-list">
              {TIMEZONE_OPTIONS.map((tz) => {
                const active = settings.timezone === tz.value;
                return (
                  <button
                    key={tz.value}
                    onClick={() => { onChange({ timezone: tz.value }); setPage("main"); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "0.55rem 1.25rem",
                      borderRadius: "0",
                      border: "none",
                      background: active ? c.tzActiveBg : "transparent",
                      color: active ? c.tzActiveText : c.tzInactiveText,
                      fontSize: "0.85rem",
                      fontWeight: active ? 500 : 400,
                      cursor: "pointer",
                      textAlign: "left",
                      outline: "none",
                      transition: "background 0.15s ease, color 0.15s ease",
                      boxSizing: "border-box",
                    }}
                  >
                    {tz.label}
                    {active && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
