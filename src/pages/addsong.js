import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar/sidebar";
import "./styles/addsong.css";

function AddSong() {
  const [musicForm, setMusicForm] = useState({
    artist: "",
    title: "",
    music: null,
  });

  return (
    <div className="addsong">
      <Sidebar />
      <div className="add_song">
        <h1>Add Songs</h1>
        <input type="text" placeholder="title" />
        <input type="file" accept=".mp3" placeholder="Add music" />
        <button>Add</button>
      </div>
    </div>
  );
}

export default AddSong;
