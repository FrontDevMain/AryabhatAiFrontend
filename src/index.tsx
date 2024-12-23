import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");
const rootInstance = createRoot(root as HTMLElement);
rootInstance.render(<App />);

serviceWorker.unregister();
