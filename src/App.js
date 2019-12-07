import React, { Component } from "react";
import Movies from "./components/Movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import { Route, Redirect, Switch } from "react-router-dom"
import ColorChangerHooks from "./testHooks/colorChanger_hooks";
import "./App.css";

// Kidcoin "Classroom Library" plug-in prototype based on Mosh H course

// Add navbar: Movies, Customers, and Rentals
// customers and rentals components
// invalid URL gos to not found page
// root of website goes to movies page
// make text title a LINK --> Movie Forms with ID / save button back to main page


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container" >
          <h1> Classroom Library </h1>
          <Switch>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/notfound" component={NotFound}></Route>
            <Redirect exact from="/" to="/movies"> </Redirect>
            <Redirect to="/notfound" > </Redirect>
          </Switch>
          <ColorChangerHooks />
        </main>
      </React.Fragment>);
  }
}

export default App;