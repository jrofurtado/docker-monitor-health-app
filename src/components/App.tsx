// import React from "react";

import { authentication } from "@/api/authentication/authentication";
import Login from "@/components/Login";
import Page from "@/components/Page";
import { useAuthorizationContext } from "@/context/AuthorizationContext";

function App() {
  // State
  const { token } = useAuthorizationContext();

  const onLogin = (username: string, password: string) =>
    authentication.getAuth(username, password);

  if (token) return <div>Logged In!</div>;

  return (
    <Page centerHor centerVer>
      <Login onLogin={onLogin} />
    </Page>
  );
}

export default App;
