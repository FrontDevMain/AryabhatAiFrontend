import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeOptions,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
//
import palette from "./palette";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import ComponentsOverrides from "./overrides";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { theme } = useSelector((state: RootState) => state.theme);

  const {
    Theme_theme,
    Theme_font_size,
    Theme_primary_colour,
    Theme_neutral_colour,
  } = theme;

  const themeOptions: ThemeOptions | any = useMemo(
    () => ({
      palette: palette(Theme_theme, Theme_primary_colour, Theme_neutral_colour),
      typography: typography(Theme_font_size),
      shape: { borderRadius: 8 },
    }),
    [Theme_theme, Theme_font_size, Theme_primary_colour, Theme_neutral_colour]
  );

  const customTheme = createTheme(themeOptions);

  customTheme.components = ComponentsOverrides(customTheme) as any;

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={customTheme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
