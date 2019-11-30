import React, { Component } from "react";
import Movies from "./components/movies";
import "./App.css";
import ColorChangerHooks from "./testHooks/colorChanger_hooks";

// Kidcoin plug-in prototype based on Mosh H course
//
class App extends Component {
  render() {
    return (
      <main className="container" >
        <h1> Classroom Library </h1>
        <Movies />
        <ColorChangerHooks />
      </main>);
  }
}

export default App;