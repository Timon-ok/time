export type FontSize = "sm" | "md" | "lg";

export const fontSizeMap: Record<FontSize, string> = {
  sm: "clamp(2rem, 9vw, 7rem)",
  md: "clamp(4rem, 16vw, 14rem)",
  lg: "clamp(6rem, 23vw, 20rem)",
};

export const dateSizeMap: Record<FontSize, string> = {
  sm: "clamp(0.6rem, 1.5vw, 1rem)",
  md: "clamp(1rem, 3vw, 2rem)",
  lg: "clamp(1.4rem, 4vw, 2.75rem)",
};

export const TIMEZONE_OPTIONS: { label: string; value: string }[] = [
  { label: "Zurich (CET/CEST)", value: "Europe/Zurich" },
  { label: "London (GMT/BST)", value: "Europe/London" },
  { label: "Paris (CET/CEST)", value: "Europe/Paris" },
  { label: "Moscow (MSK)", value: "Europe/Moscow" },
  { label: "Dubai (GST)", value: "Asia/Dubai" },
  { label: "Mumbai (IST)", value: "Asia/Kolkata" },
  { label: "Bangkok (ICT)", value: "Asia/Bangkok" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "Sydney (AEST)", value: "Australia/Sydney" },
  { label: "New York (EST/EDT)", value: "America/New_York" },
  { label: "Chicago (CST/CDT)", value: "America/Chicago" },
  { label: "Denver (MST/MDT)", value: "America/Denver" },
  { label: "Los Angeles (PST/PDT)", value: "America/Los_Angeles" },
  { label: "São Paulo (BRT)", value: "America/Sao_Paulo" },
  { label: "UTC", value: "UTC" },
];

export interface ClockSettings {
  showSeconds: boolean;
  hour12: boolean;
  showDate: boolean;
  fontSize: FontSize;
  dateFontSize: FontSize;
  timezone: string;
}

export const defaultSettings: ClockSettings = {
  showSeconds: false,
  hour12: false,
  showDate: true,
  fontSize: "md",
  dateFontSize: "md",
  timezone: "Europe/Zurich",
};
