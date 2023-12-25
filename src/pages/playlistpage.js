import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar/sidebar";
import "./styles/playlistpage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Music from "../component/music/music";

function PlaylistPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");
  const playId = params.get("playid");

  const nav = useNavigate();

  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Play ID:", playId);

    // Your other component logic here...
  }, [userId, playId]);

  const [editplayname, setEditplayname] = useState("");

  const [playname, setPlayName] = useState("");

  const [musicid, setMusicid] = useState([]);

  const [audios, setAudios] = useState([]);

  const [plays, setplays] = useState([]);

  const [song, setSong] = useState("");

  const [songId, setSongId] = useState("");

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

  const DeleteTrack = () => {
    audios.forEach((item) => {
      if (item._id === songId) {
        plays.forEach((play) => {
          if (play.user === userId && play._id === playId) {
            console.log("Song ID : ", songId);
            play.musiclist.forEach((list, index) => {
              if (list === songId) {
                // console.log("Removing song with ID:", songId);
                // Find the index of the element in the array and remove it
                play.musiclist.splice(index, 1);
                updatePlays(plays);
              }
            });
          }
        });
      }
    });
  };

  const updatePlays = (newPlays) => {
    newPlays.forEach((play) => {
      if (play._id === playId) {
        axios
          .put(
            `http://localhost:2000/playlist/updateplaylist/${playId}`,
            play,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res.data.getresult);
          })
          .catch((err) => {
            // Log the entire error object to get more details
            console.error("Axios Error:", err);

            // Log specific details like status and response data
            if (err.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error("Status Code:", err.response.status);
              console.error("Response Data:", err.response.data);
            } else if (err.request) {
              // The request was made but no response was received
              console.error("No response received:", err.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Error during request setup:", err.message);
            }
          });
      }
    });
  };

  const MusicList = musicid.map((mus, index) => {
    const matchedAudio = audios.find((item) => item._id === mus);

    // Check if a matching audio is found
    if (matchedAudio) {
      return (
        <li className="playlist_music" key={index}>
          <h4
            onClick={() => {
              setSong(matchedAudio.music);
              setSongId(mus);
            }}
          >
            {matchedAudio.title}
          </h4>
          <button
            className="delete__Track"
            onClick={() => {
              DeleteTrack();
              setSongId(mus);
            }}
          >
            Delete Song
          </button>
        </li>
      );
    }

    // Optionally, you can return null or an empty fragment for items without a match
    return null;
  });

  const DeletePlaylist = () => {
    axios
      .delete(`http://localhost:2000/playlist/deleteplaylist/${playId}`, plays)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    nav(`/?id=${userId}`);
  };

  return (
    <div className="playlist__page">
      <Sidebar />
      <div className="playlist_main">
        <h1>{playname}</h1>
        <div>
          <input
            type="text"
            name="name"
            onChange={(e) => {
              setEditplayname(e.target.value);
            }}
          />
          <button className="playnameEditbtn"
            onClick={() => {
              axios
                .put(
                  `http://localhost:2000/playlist/updateplaylist/${playId}`,
                  { name: editplayname }
                )
                .then((res) => {
                  console.log(res.status);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Edit name
          </button>
        </div>
        <ul className="musicList">{MusicList}</ul>
        <button onClick={DeletePlaylist} className="delete__playlist">
          Delete playlist
        </button>
      </div>
      <Music song={song} />
    </div>
  );
}

export default PlaylistPage;
