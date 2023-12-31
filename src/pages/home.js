import React, { useEffect, useState } from "react";
import "./styles/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../component/sidebar/sidebar";
import Useraccount from "../component/useraccount/useraccount";
import axios from "axios";
import Music from "../component/music/music";

function Home() {
  const location = useLocation();
  const nav = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState();

  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const [song, setSong] = useState("");

  if (userId === null) {
    nav("/login");
  }
  useEffect(() => {
    axios
      .get("http://localhost:2000/track/gettrack/")
      .then((res) => {
        setTracks(res.data.getresult);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, song]);

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


  return (
    <div className="home-main">
      <Useraccount />
      <Sidebar />
      <div className="home">
        <h3 className="goodmorning">Good Morning</h3>
        <h2>Music Library</h2>
        <div className="music_library">
          <ul className="music_list">{trackList}</ul>
        </div>
      </div>
      <Music userId={userId} song={song} />
    </div>
  );
}

export default Home;
