import React from "react";
import Router from "./Router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <React.Fragment>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </React.Fragment>
  );
}

export default App;
