import { BrowserRouter, Route, Routes } from "react-router-dom";

import List from "@/components/applications/ApplicationList";
import Server from "@/components/applications/Server";
import Login from "@/components/Login";
import ROUTES from "@/resources/ROUTES";

function App(): JSX.Element {
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
