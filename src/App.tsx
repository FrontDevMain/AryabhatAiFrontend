import { BrowserRouter } from "react-router-dom";

import ThemeProvider from "./theme";
import Router from "./routes";
import { AuthProvider } from "./auth/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import store from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
