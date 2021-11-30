import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import List from "@/components/applications/ApplicationList";
import Server from "@/components/applications/Server";
import Login from "@/components/Login";
import { keycloakAPI } from "@/requests/authentication/authentication";
import ROUTES from "@/resources/ROUTES";
import { showSnackbar } from "@/resources/snackbar";

function App(): JSX.Element {
  // Hooks - Snackbar
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    keycloakAPI.setInterceptors(showSnackbar(enqueueSnackbar));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.APPLICATIONS} element={<List />} />
        <Route path={ROUTES.SERVER()} element={<Server />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
