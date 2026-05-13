import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {AuthProvider} from "./authContext.jsx";
import { ScreenSizeProvider } from "./assets/context/screenSize.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
   <ScreenSizeProvider>
    <App />
  </ScreenSizeProvider>
  </StrictMode>,
);
