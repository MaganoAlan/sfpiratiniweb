import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Router } from "./routes";
import { GlobalStyle } from "./style/global";
import Default from "./style/theme/Default";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={Default}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
