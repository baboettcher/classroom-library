import React, { Component } from "react";
import Movies from "./components/Movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import Register from "./components/register";
import Navbar from "./components/navbar";
import { Route, Redirect, Switch } from "react-router-dom"
import ColorChangerHooks from "./testHooks/colorChanger_hooks";
import "./App.css";

// Kidcoin "Classroom Library" plug-in prototype based on Mosh H course


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container" >
          <h1> Classroom Library </h1>
          <Switch>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={Register}></Route>
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