import { BrowserRouter, Route, Routes } from "react-router-dom";

import List from "@/components/Applications/List";
import Server from "@/components/Applications/Server";
import Login from "@/components/Login";
import ROUTES from "@/resources/ROUTES";

function App() {
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
