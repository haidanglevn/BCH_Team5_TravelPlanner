import "./App.css";
import Welcome from "./Welcome";
import Intro from "./Intro";
import SearchBar from "./SearchBar";
import CityExplore from "./CityExplore";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <div>
        <Welcome />
      </div>
      <main>
        <Intro />
        <SearchBar />
        <CityExplore />
      </main>
      <NavBar />
    </div>
  );
}

export default App;
