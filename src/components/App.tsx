// import React from "react";

import { getAuth } from "@/api/authentication";

// import authentication from "@/api/authentication";

function App() {
  // const test = authentication.getAuth();
  getAuth();

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
