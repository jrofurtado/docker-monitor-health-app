import { Navigate, useLocation } from "react-router-dom";

import { useAuthorizationContext } from "@/context/AuthorizationContext";
import ROUTES from "@/resources/ROUTES";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuthorizationContext();
  const location = useLocation();

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
