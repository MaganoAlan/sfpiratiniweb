import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./App.routes";
import { AuthRoutes } from "./Auth.routes";

export function Router() {
  const [auth, setAuth] = useState(true);

  return <BrowserRouter>{auth ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>;
}
