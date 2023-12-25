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
  }, [userId, playId]);

  const [editplayname, setEditplayname] = useState("");

  const [playname, setPlayName] = useState("");

  const [musicid, setMusicid] = useState([]);

  const [audios, setAudios] = useState([]);

  const [plays, setplays] = useState([]);

  const [song, setSong] = useState("");

  const [songId, setSongId] = useState("");

  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/playlist/getplaylist/")
      .then((res) => {
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
            console.error("Axios Error:", err);

            if (err.response) {
              console.error("Status Code:", err.response.status);
              console.error("Response Data:", err.response.data);
            } else if (err.request) {
              console.error("No response received:", err.request);
            } else {
              console.error("Error during request setup:", err.message);
            }
          });
      }
    });
  };

  const MusicList = musicid.map((mus, index) => {
    const matchedAudio = audios.find((item) => item._id === mus);

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

  useEffect(() => {
    axios
      .get("http://localhost:2000/track/gettrack/")
      .then((res) => {
        setTracks(res.data.getresult);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addToPlaylist = (itemId, title) => {
    if (!playlist.includes(itemId)) {
      setPlaylist((prevPlaylist) => [...prevPlaylist, itemId]);
      setAddedItems((prevItems) => [...prevItems, itemId]);
    } else {
      console.log(`${title} is already in the playlist`);
    }

    updatePlaysMusic();
  };

  const [updatePlay, setUpdatePlay] = useState({});

  const updatePlaysMusic = () => {
    axios
      .get(`http://localhost:2000/playlist/getplaylistbyid/${playId}`)
      .then((res) => {
        const currentPlaylist = res.data.getresult;

        const uniqueAddedItems = addedItems.filter(
          (item) => !currentPlaylist.musiclist.includes(item)
        );

        if (uniqueAddedItems.length === 0) {
          console.log("No new items to add.");
          return;
        }

        const updatedPlaylist = {
          ...currentPlaylist,
          musiclist: [...currentPlaylist.musiclist, ...uniqueAddedItems],
        };

        setUpdatePlay(updatedPlaylist);

        console.log("Current playlist:", updatedPlaylist);

        axios
          .put(
            `http://localhost:2000/playlist/updateplaylist/${playId}`,
            updatedPlaylist
          )
          .then((res) => {
            console.log("Playlist updated successfully:", res.status);
          })
          .catch((error) => {
            console.error("Error updating playlist:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching playlist:", error);
      });
  };

  const musicLib = tracks.map((item) => {
    const isAdded = addedItems.includes(item._id);

    return (
      <li key={item._id} style={{ display: isAdded ? "none" : "block" }}>
        <p
          onClick={() => {
            addToPlaylist(item._id, item.title);
          }}
          className="music__text"
        >
          {item.title}
        </p>
      </li>
    );
  });

  return (
    <div className="playlist__page">
      <div className="add___music">
        <ul className="add__music__list">{musicLib}</ul>
      </div>
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
          <button
            className="playnameEditbtn"
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
