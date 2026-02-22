export interface ClockSettings {
  showSeconds: boolean;
  hour12: boolean;
  showDate: boolean;
}

export const defaultSettings: ClockSettings = {
  showSeconds: false,
  hour12: false,
  showDate: true,
};
