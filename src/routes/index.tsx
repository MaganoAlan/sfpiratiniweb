import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./App.routes";
import { AuthRoutes } from "./Auth.routes";
import Loader from "../components/Loader";

export function Router() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((res: any) => {
      setUser(res);
      setIsLoading(false);
    });
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      {user && user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}
