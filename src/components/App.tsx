import List from "@/components/Applications/List";
import Login from "@/components/Login";
import Page from "@/components/Page";
import { useAuthorizationContext } from "@/context/AuthorizationContext";

function App() {
  // State
  const { token } = useAuthorizationContext();

  if (token)
    return (
      <Page centerHor centerVer>
        <List />
      </Page>
    );

  return (
    <Page centerHor centerVer>
      <Login />
    </Page>
  );
}

export default App;
