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

export interface ClockSettings {
  showSeconds: boolean;
  hour12: boolean;
  showDate: boolean;
  fontSize: FontSize;
  dateFontSize: FontSize;
}

export const defaultSettings: ClockSettings = {
  showSeconds: false,
  hour12: false,
  showDate: true,
  fontSize: "md",
  dateFontSize: "md",
};
