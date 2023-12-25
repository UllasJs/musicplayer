import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./userAuth/signup";
import Login from "./userAuth/login";
import Home from "./pages/home";
import Userprofile from "./pages/userprofile";
import Admin from "./userAuth/admin_panel/admin";
import AddSong from "./pages/addsong";
import PlaylistPage from "./pages/playlistpage";
import SearchSongs from "./pages/searchsongs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/userProfile" element={<Userprofile />}></Route>
          <Route path="/playlist" element={<PlaylistPage />}></Route>
          <Route path="/addsong" element={<AddSong />}></Route>
          <Route path="/searchsongs" element={<SearchSongs />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
