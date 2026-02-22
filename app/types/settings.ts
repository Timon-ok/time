export type FontSize = "sm" | "md" | "lg";

export const fontSizeMap: Record<FontSize, string> = {
  sm: "clamp(2rem, 9vw, 7rem)",
  md: "clamp(4rem, 16vw, 14rem)",
  lg: "clamp(6rem, 23vw, 20rem)",
};

export interface ClockSettings {
  showSeconds: boolean;
  hour12: boolean;
  showDate: boolean;
  fontSize: FontSize;
}

export const defaultSettings: ClockSettings = {
  showSeconds: false,
  hour12: false,
  showDate: true,
  fontSize: "md",
};
