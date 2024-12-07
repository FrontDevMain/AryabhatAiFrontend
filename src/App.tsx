import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "./components/settings";
import ThemeProvider from "./theme";
import Router from "./routes";
import { AuthProvider } from "./auth/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
