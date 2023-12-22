import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./userAuth/signup";
import Login from "./userAuth/login";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
