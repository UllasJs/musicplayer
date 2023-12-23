import "./sidebar.css";
import React, { useEffect, useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const location = useLocation();
  const [user, setNewser] = useState({});

  // Use URLSearchParams to get the value of id from the search parameters
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

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

  return (
    <div className="sidebar">
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
        <ul className="playlist__list">
          <li>
            <Link className="play_links" to="/">
              playlist name
            </Link>
          </li>
        </ul>
        <Link className="add__song" to={`/addsong/?id=${userId}`}>
          Add track
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
