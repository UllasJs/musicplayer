import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar/sidebar";
import "./styles/searchsong.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Music from "../component/music/music";

function SearchSongs() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [song, setSong] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2000/track/gettrack/")
      .then((res) => {
        setTracks(res.data.getresult);
        setFilteredTracks(res.data.getresult); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    const filtered = tracks.filter((track) =>
      track.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTracks(filtered);
  }, [searchTerm, tracks]);

  const trackList = filteredTracks.map((track, index) => {
    return (
      <li
        onClick={() => {
          setSong(track.music);
        }}
        key={index}
      >
        <p className="track__music">{track.title}</p>
      </li>
    );
  });

  return (
    <div className="searchsong__outer">
      <Sidebar />
      <div className="search_inner">
        <div className="search_bar">
          <input
            type="text"
            placeholder="Search songs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="songs__list">
          <ul className="songs__ul">{trackList}</ul>
        </div>
      </div>
      <Music userId={userId} song={song} />
    </div>
  );
}

export default SearchSongs;
