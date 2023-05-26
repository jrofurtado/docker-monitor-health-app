import React from "react";
import { SnackbarProvider } from "notistack";

import "./styles/App.css";
// Components

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import NotFound from "./components/Page/NotFound";

import Home from "./components/Page/Home";
import History from "./components/Page/History";
import Information from "./components/Page/Information";

interface Props {
  kc: any;
}
interface ServInterface {
  serviceName: string;
  appName: string;
}
function App(props: Props): JSX.Element {
  const { kc } = props;

  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Header kc={kc} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="logs/:appName/:serviceName/" element={<History />} />
          <Route
            path="logs/:appName/:serviceName/:time/info/:key/:timeStamp"
            element={<Information />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
