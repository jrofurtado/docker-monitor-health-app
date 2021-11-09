// import React from "react";

import { authentication } from "@/api/authentication/authentication";

function App() {
  authentication
    .getAuth()
    .then(() => console.log("done"))
    .catch(() => {});

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
