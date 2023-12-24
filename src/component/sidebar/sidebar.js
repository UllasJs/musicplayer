import "./sidebar.css";
import React, { useEffect, useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const location = useLocation();
  const [user, setNewser] = useState({});
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  // const [playId, setPlayId] = useState("");

  const [play, setplay] = useState([]);

  const [playname, setPlayName] = useState("");

  // Use URLSearchParams to get the value of id from the search parameters
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const PlaylistOverlay = document.querySelector(".Add__playlist_overlay");

  useEffect(() => {
    axios
      .get(`http://localhost:2000/user/getuserbyid/${userId}`)
      .then((res) => {
        setNewser(res.data.getresult);
      });
  }, [userId]);

  const add__song = document.querySelector(".add__song");

  if (user.role === "user") {
    add__song.style.display = "none";
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
  }, []);

  const addToPlaylist = (itemId, title) => {
    // Check if the item is already in the playlist
    if (!playlist.includes(itemId)) {
      // If not, add it to the playlist and mark it as added
      setPlaylist((prevPlaylist) => [...prevPlaylist, itemId]);
      setAddedItems((prevItems) => [...prevItems, itemId]);
    } else {
      console.log(`${title} is already in the playlist`);
    }
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

  const Add_Playlist = () => {
    const playlistData = {
      name: playname,
      user: userId,
      musiclist: playlist,
    };

    axios
      .post("http://localhost:2000/playlist/addplaylist/", playlistData)
      .then((res) => {
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:2000/playlist/getplaylist/")
      .then((res) => {
        setplay(res.data.getresult);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const playlists = play.map((item) => {
    // setPlayId(item._id);
    if (item.user === userId)
      return (
        <li className="playlistList" key={item._id}>
          <Link
            className="play_links"
            to={`/playlist/?id=${userId}&playid=${item._id}`}
          >
            {item.name}
          </Link>
        </li>
      );
  });

  return (
    <div className="sidebar">
      <div className="Add__playlist_overlay">
        <input
          type="text"
          name="playname"
          onChange={(e) => {
            setPlayName(e.target.value);
          }}
          placeholder="playlist name"
        />
        <ul className="music__playlist">{musicLib}</ul>
        <div className="buttons_overlay">
          <button onClick={Add_Playlist} className="create__playlist">
            Create PlayList
          </button>
          <button
            onClick={() => {
              PlaylistOverlay.style.display = "none";
            }}
            className="create__playlist"
          >
            close
          </button>
        </div>
      </div>
      <div className="naviagte">
        <Link className="navlinks" to={`/?id=${userId}`}>
          <RiHomeLine />
          home
        </Link>
        <Link className="navlinks" to={`/searchsongs?id=${userId}`}>
          <FiSearch />
          Search
        </Link>
      </div>
      <div className="library">
        <h4>Playlist</h4>
        <button
          onClick={() => {
            PlaylistOverlay.style.display = "block";
          }}
          className="addplaylist"
        >
          add playlist
        </button>
        <ul className="playlist__list">{playlists}</ul>
        <Link className="add__song" to={`/addsong/?id=${userId}`}>
          Add track
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
