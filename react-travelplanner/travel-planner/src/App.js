import { Component } from "react";
import React from "react";

import "./App.css";
import Welcome from "./Welcome";
import Intro from "./Intro";
import SearchBar from "./SearchBar";
import CityExplore from "./CityExplore";
import NavBar from "./NavBar";

class App extends Component {
  state = {
    search: "",
    userName: "Homer",
  };

  searchHandler = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <Welcome userName={this.state.userName} />
        <Intro />
        <SearchBar searchEvent={this.searchHandler} />
        <CityExplore />
        <NavBar />
      </div>
    );
  }
}

export default App;
