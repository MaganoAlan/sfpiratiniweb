import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Router } from "./routes";
import { GlobalStyle } from "./style/global";
import Default from "./style/theme/Default";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBEHYzEsiHi1_SadiiLLDh6hwj13sPS6D4",
  authDomain: "studio-fitness-piratini.firebaseapp.com",
  projectId: "studio-fitness-piratini",
  storageBucket: "studio-fitness-piratini.appspot.com",
  messagingSenderId: "760173632969",
  appId: "1:760173632969:web:388af73ed68d62bc8b9c18",
  measurementId: "G-BS7H4BF9RX",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={Default}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
