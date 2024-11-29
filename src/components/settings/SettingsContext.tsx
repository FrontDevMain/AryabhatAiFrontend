import { ReactNode, createContext, useEffect, useContext, useMemo, useCallback } from 'react';
// hooks
import useLocalStorage from '../hooks/useLocalStorage';
//
import { defaultSettings } from './config';
import { SettingsContextProps } from './types';
import { defaultPreset, getPresets, presetsOption } from './presets';

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},
  // Layout
  onChangeLayout: () => {},
  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},
  // Color
  onChangeColorPresets: () => {},
  presetsColor: defaultPreset,
  presetsOption: [],
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

  // Mode
  const onToggleMode = useCallback(() => {
    const themeMode = settings.themeMode === 'light' ? 'dark' : 'light';
    setSettings({ ...settings, themeMode });
  }, [setSettings, settings]);

  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeMode = event.target.value;
      setSettings({ ...settings, themeMode });
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
    const themeContrast = settings.themeContrast === 'default' ? 'bold' : 'default';
    setSettings({ ...settings, themeContrast });
  }, [setSettings, settings]);

  const onChangeContrast = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeContrast = event.target.value;
      setSettings({ ...settings, themeContrast });
    },
    [setSettings, settings]
  );

  // Color
  const onChangeColorPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeColorPresets = event.target.value;
      setSettings({ ...settings, themeColorPresets });
    },
    [setSettings, settings]
  );

  const value = useMemo(
    () => ({
      ...settings,
      // Mode
      onToggleMode,
      onChangeMode,
      // Layout
      onChangeLayout,
      // Contrast
      onChangeContrast,
      onToggleContrast,
      // Color
      onChangeColorPresets,
      presetsOption,
      presetsColor: getPresets(settings.themeColorPresets),
    }),
    [
      settings,
      // Mode
      onToggleMode,
      onChangeMode,
      // Layout
      onChangeLayout,
      onChangeContrast,
      // Contrast
      onToggleContrast,
      // Color
      onChangeColorPresets,
    ]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
