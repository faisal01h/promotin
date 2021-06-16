import { BrowserRouter as Router } from "react-router-dom";
import MainApp from "./mainApp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <MainApp />
      </Router>
    </div>
  );
}

export default App;
