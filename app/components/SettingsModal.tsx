"use client";

import { useState } from "react";
import { ClockSettings, FontSize, TIMEZONE_OPTIONS } from "../types/settings";

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

function SizePicker({ value, onChange }: { value: FontSize; onChange: (s: FontSize) => void }) {
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

  const currentTzLabel = TIMEZONE_OPTIONS.find((t) => t.value === settings.timezone)?.label ?? settings.timezone;

  // Reset to main page when modal closes
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
          backdropFilter: "blur(16px)",
          zIndex: 20,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-0.5rem) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          overflow: "hidden",
        }}
      >
        {/* Sliding track */}
        <div
          style={{
            display: "flex",
            width: "200%",
            alignItems: "stretch",
            transform: page === "timezone" ? "translateX(-50%)" : "translateX(0)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* ── Main page ── */}
          <div style={{ width: "50%", padding: "1.25rem 1.5rem 1.5rem", flexShrink: 0 }}>
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

            {/* Size pickers */}
            <div style={{ padding: "0.75rem 0 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 400, marginBottom: "0.5rem" }}>Time size</div>
                <SizePicker value={settings.fontSize} onChange={(s) => onChange({ fontSize: s })} />
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 400, marginBottom: "0.5rem" }}>Date size</div>
                <SizePicker value={settings.dateFontSize} onChange={(s) => onChange({ dateFontSize: s })} />
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
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#fff",
                  cursor: "pointer",
                  outline: "none",
                  transition: "background 0.15s ease",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 400 }}>Timezone</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.1rem" }}>{currentTzLabel}</div>
                </div>
                <span style={{ color: "rgba(255,255,255,0.35)", display: "flex" }}><ChevronRight /></span>
              </button>
            </div>
          </div>

          {/* ── Timezone page ── */}
          <div style={{ width: "50%", flexShrink: 0, display: "flex", flexDirection: "column", alignSelf: "stretch" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "1.25rem 1.5rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => setPage("main")}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.75)", cursor: "pointer", padding: "0.1rem", display: "flex", outline: "none" }}
              >
                <ChevronLeft />
              </button>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Timezone
              </span>
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0 0.75rem" }} className="tz-list">
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
                      background: active ? "rgba(255,255,255,0.1)" : "transparent",
                      color: active ? "#fff" : "rgba(255,255,255,0.55)",
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
