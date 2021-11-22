import { Link, useLocation, useNavigate } from "react-router-dom";

import { authentication } from "@/requests/authentication/authentication";
import ROUTES from "@/resources/ROUTES";

export function Header(): JSX.Element {
  // Router
  const navigate = useNavigate();
  const location = useLocation();

  const onLogoutClick = (): void => {
    authentication.removeAuth();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="absolute top-0 left-0 w-full mx-auto flex justify-between bg-indigo-500 p-3">
      <Link to={ROUTES.APPLICATIONS} className="text-white font-bold">
        Globaleda Statistics
      </Link>
      {location.pathname !== ROUTES.LOGIN && (
        <button className="text-white font-bold" onClick={onLogoutClick}>
          Sign Out
        </button>
      )}
    </header>
  );
}
