import React, { useEffect } from "react";
import "./styles/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../component/sidebar/sidebar";
import Playlist from "../component/playlist/playlist";
import Useraccount from "../component/useraccount/useraccount";

function Home() {
  const location = useLocation();
  const nav = useNavigate();

  // Use URLSearchParams to get the value of id from the search parameters
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  useEffect(() => {
    if (userId === null) {
      nav("/login");
    }
  });

  // console.log(userId);

  return (
    <div className="home-main">
      <Useraccount />
      <Sidebar />
      <div className="home">
        <h3 className="goodmorning">Good Morning</h3>
        <div className="playlists_bar">
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div>
        <h2>Music Library</h2>
        <div className="music_library">
          <ul className="music_list">
            <li>
              <a href="_blank">music</a>
            </li>
            <li>
              <a href="_blank">music</a>
            </li>
            <li>
              <a href="_blank">music</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
