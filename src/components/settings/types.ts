// ----------------------------------------------------------------------

type ColorVariants = {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ThemeModeValue = "light" | "dark";
export type ThemeContrastValue = "default" | "bold";
export type ThemeLayoutValue = "vertical" | "horizontal" | "mini";
export type ThemeColorPresetsValue =
  | "default"
  | "cyan"
  | "purple"
  | "blue"
  | "orange"
  | "red";

export type SettingsValueProps = {
  themeMode: ThemeModeValue;
  themeLayout: ThemeLayoutValue;
  themeContrast: ThemeContrastValue;
  fontSize: number;
  primaryColor: string;
  neturalColor: string;
};

export type SettingsContextProps = SettingsValueProps & {
  // Mode
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFontSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Layout
  onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Contrast
  onToggleContrast: VoidFunction;
  onChangeContrast: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (value: string) => void;
  onChangeNeturalColor: (value: string) => void;
};
