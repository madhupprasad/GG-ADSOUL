import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import AppDetails from "./components/AppDetails";
function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route path="/appdetails/:id" component={AppDetails}></Route>
    </Router>
  );
}

export default App;
