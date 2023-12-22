import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./userAuth/login";
import Signup from "./userAuth/signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
