import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

import App from "./components/App";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Checkout from "./components/Checkout";

import registerServiceWorker from "./registerServiceWorker";

const Root = () => (
  <Router>
    <Switch>
      <Route component={App} exact path="/" />
      <Route component={Signin} exact path="/signin" />
      <Route component={Signup} exact path="/signup" />
      <Route component={Checkout} exact path="/checkout" />
    </Switch>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
