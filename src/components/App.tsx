// import React from "react";

import Login from "@/components/Login";
import Page from "@/components/Page";
import { useAuthorizationContext } from "@/context/AuthorizationContext";

function App() {
  // State
  const { token } = useAuthorizationContext();

  if (token) return <div>Logged In!</div>;

  return (
    <Page centerHor centerVer>
      <Login />
    </Page>
  );
}

export default App;
