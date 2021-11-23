import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuthorizationContext } from "@/context/AuthorizationContext";
import { serviceAPI } from "@/requests/authentication/authentication";
import ROUTES from "@/resources/ROUTES";
import { showSnackbar } from "@/resources/snackbar";

interface Props {
  children: JSX.Element;
}

function RequireAuth({ children }: Props): JSX.Element {
  // Context
  const { token } = useAuthorizationContext();

  // Router
  const location = useLocation();
  const navigate = useNavigate();

  // Hooks - Snackbar
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    serviceAPI.setInterceptors(navigate, showSnackbar(enqueueSnackbar));
  }, []);

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
