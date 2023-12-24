import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar/sidebar";
import "./styles/playlistpage.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Music from "../component/music/music";

function PlaylistPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");
  const playId = params.get("playid");

  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Play ID:", playId);

    // Your other component logic here...
  }, [userId, playId]);

  const [playname, setPlayName] = useState("");

  const [musicid, setMusicid] = useState([]);

  const [audios, setAudios] = useState([]);

  const [plays, setplays] = useState([]);

  const [song, setSong] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2000/playlist/getplaylist/")
      .then((res) => {
        // console.log(res.data.getresult);
        setplays(res.data.getresult);
        plays.map((item) => {
          if (item.user === userId) {
            if (item._id === playId) {
              setPlayName(item.name);
              setMusicid(item.musiclist);
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:2000/track/gettrack/")
      .then((res) => {
        setAudios(res.data.getresult);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playId, plays, userId]);

  const MusicList = musicid.map((mus, index) => {
    const matchedAudio = audios.find((item) => item._id === mus);

    // Check if a matching audio is found
    if (matchedAudio) {
      return (
        <li className="playlist_music" key={index}>
          <p
            onClick={() => {
              setSong(matchedAudio.music);
            }}
          >
            {matchedAudio.title}
          </p>
        </li>
      );
    }

    // Optionally, you can return null or an empty fragment for items without a match
    return null;
  });

  return (
    <div className="playlist__page">
      <Sidebar />
      <div className="playlist_main">
        <h1>{playname}</h1>
        <ul className="musicList">{MusicList}</ul>
      </div>
      <Music song={song} />
    </div>
  );
}

export default PlaylistPage;
