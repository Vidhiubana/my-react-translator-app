import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Translate from "./components/Translate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/translate" element={<Translate />} />
      </Routes>
    </Router>
  );
}

export default App;
