import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Search from "./components/Search";
import Item from "./components/Item";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Search} />
          <Route path="/search" component={Search} />
          <Route path="/item/:id" component={Item} />
        </div>
      </Router>
    );
  }
}
export default App;
