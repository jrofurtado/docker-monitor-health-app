import { useParams } from "react-router-dom";

import Page from "@/components/Page";

export default function Server() {
  // Router
  const params = useParams();

  return (
    <Page centerHor centerVer>
      <h1>App: {params.app}</h1>
      <h1>Server: {params.server}</h1>
    </Page>
  );
}
