import React, { useEffect, useRef, useState } from "react";
import "./styles/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../component/sidebar/sidebar";
import Playlist from "../component/playlist/playlist";
import Useraccount from "../component/useraccount/useraccount";
import axios from "axios";
import Music from "../component/music/music";

function Home() {
  const location = useLocation();
  const nav = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState();

  // Use URLSearchParams to get the value of id from the search parameters
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const [song, setSong] = useState();

  useEffect(() => {
    if (userId === null) {
      nav("/login");
    }
    axios
      .get("http://localhost:2000/track/gettrack/")
      .then((res) => {
        setTracks(res.data.getresult);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(tracks);
  }, [userId]);

  const trackList = tracks.map((track, index) => {
    return (
      <li
        onClick={() => {
          setSong(track.music);
        }}
        key={index}
      >
        <p>{track.title}</p>
      </li>
    );
  });

  useEffect(() => {
    console.log(playing);
  }, [playing]);

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
          <ul className="music_list">{trackList}</ul>
        </div>
      </div>
      <Music song={song} />
    </div>
  );
}

export default Home;
