import {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
// hooks
import useLocalStorage from "../hooks/useLocalStorage";
//
import { defaultSettings } from "./config";
import { SettingsContextProps } from "./types";

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},
  onChangeFontSize: () => {},
  // Layout
  onChangeLayout: () => {},
  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},
  onChangeColor: () => {},
  onChangeNeturalColor: () => {},
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error("useSettingsContext must be use inside SettingsProvider");

  return context;
};

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  // Mode
  const onToggleMode = useCallback(() => {
    const themeMode = settings.themeMode === "light" ? "dark" : "light";
    setSettings({ ...settings, themeMode });
  }, [setSettings, settings]);

  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeMode = event.target.value;
      setSettings({ ...settings, themeMode });
    },
    [setSettings, settings]
  );

  const onChangeFontSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fontSize = event.target.value;
      setSettings({ ...settings, fontSize: fontSize });
    },
    [setSettings, settings]
  );

  // Layout
  const onChangeLayout = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeLayout = event.target.value;
      setSettings({ ...settings, themeLayout });
    },
    [setSettings, settings]
  );

  // Contrast
  const onToggleContrast = useCallback(() => {
    const themeContrast =
      settings.themeContrast === "default" ? "bold" : "default";
    setSettings({ ...settings, themeContrast });
  }, [setSettings, settings]);

  const onChangeContrast = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeContrast = event.target.value;
      setSettings({ ...settings, themeContrast });
    },
    [setSettings, settings]
  );
  const onChangeColor = useCallback(
    (value: string) => {
      const primaryColor = value;
      setSettings({ ...settings, primaryColor });
    },
    [setSettings, settings]
  );
  const onChangeNeturalColor = useCallback(
    (value: string) => {
      const neturalColor = value;
      setSettings({ ...settings, neturalColor });
    },
    [setSettings, settings]
  );

  const value = useMemo(
    () => ({
      ...settings,
      // Mode
      onToggleMode,
      onChangeMode,
      onChangeFontSize,
      // Layout
      onChangeLayout,
      // Contrast
      onChangeContrast,
      onToggleContrast,
      onChangeColor,
      onChangeNeturalColor,
    }),
    [
      settings,
      // Mode
      onToggleMode,
      onChangeMode,
      onChangeFontSize,
      // Layout
      onChangeLayout,
      onChangeContrast,
      // Contrast
      onToggleContrast,
      onChangeColor,
      onChangeNeturalColor,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
