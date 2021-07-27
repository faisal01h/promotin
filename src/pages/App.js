import { BrowserRouter as Router } from "react-router-dom";
import MainApp from "./mainApp";
import "./App.css";
import axios from 'axios'

function App() {

  (function() {
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : undefined
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
  })();

  return (
    <div className="App">
      <Router>
        <MainApp />
      </Router>
    </div>
  );
}

export default App;
