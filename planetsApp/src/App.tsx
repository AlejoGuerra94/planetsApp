import PlanetDetail from "./pages/PlanetDeail";
import PlanetsApp from "./pages/Planets";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetsApp />} />
        <Route path="/planets/:planetId" element={<PlanetDetail />} />      </Routes>
    </Router>
  );
}

export default App;
