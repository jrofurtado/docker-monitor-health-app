import { useLocation, matchPath, Link, useParams } from "react-router-dom";

import ROUTES from "@/resources/ROUTES";

export default function Breadcrumbs(): JSX.Element {
  // Router
  const location = useLocation();
  const params = useParams();

  // Applications
  if (!!matchPath(ROUTES.APPLICATIONS, location.pathname)) {
    return (
      <div className="w-full flex justify-center p-8 ">
        <div className="text-indigo-500 font-bold text-lg p-1 flex flex-row">
          <div>Applications</div>
        </div>
      </div>
    );
  }

  // Server

  if (!!matchPath(ROUTES.SERVER(), location.pathname)) {
    return (
      <div className="w-full flex justify-center p-8 ">
        <div className="text-indigo-500 text-lg p-1 flex flex-row">
          <Link to={ROUTES.APPLICATIONS} className="font-bold">
            Applications
          </Link>
          <div className="pl-2">{`>  ${params.app ?? ""}  >  ${
            params.server ?? ""
          }`}</div>
        </div>
      </div>
    );
  }

  return <></>;
}
