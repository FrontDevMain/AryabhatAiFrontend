import { BrowserRouter } from "react-router-dom";
import { SettingsProvider, ThemeSettings } from "./components/settings";
import ThemeProvider from "./theme";
import Router from "./routes";

function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <ThemeSettings>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeSettings>
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;
