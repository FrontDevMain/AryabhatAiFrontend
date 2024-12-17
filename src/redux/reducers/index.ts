import { combineReducers } from "redux";
import themeReducer from "./ThemeReducer";
import licenseReducer from "./LicenseReducer";
import notebookReducer from "./NotebookReducer";
import llmReducer from "./LlmReducer";
import chatReducer from "./ChatReducer";
import tagReducer from "./TagReducer";

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  license: licenseReducer,
  notebook: notebookReducer,
  llm: llmReducer,
  chat: chatReducer,
  tag: tagReducer,
});

// Define RootState based on rootReducer's return type
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
