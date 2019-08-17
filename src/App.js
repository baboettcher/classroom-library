import React, { Component } from "react";
import Movies from "./components/Movies";
import "./App.css";

// Kidcoin plug-in prototype based on Mosh H course
//
class App extends Component {
  render() {
    return (
      <main className="container">
        <h1>Classroom: Room 19 Videos</h1>
        <Movies />
      </main>
    );
  }
}

export default App;
