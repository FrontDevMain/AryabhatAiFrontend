import { combineReducers } from "redux";
import themeReducer from "./ThemeReducer";
import licenseReducer from "./LicenseReducer";
import notebookReducer from "./NotebookReducer";

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  license: licenseReducer,
  notebook: notebookReducer,
});

// Define RootState based on rootReducer's return type
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
