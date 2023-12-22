import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  // Use URLSearchParams to get the value of id from the search parameters
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  return (
    <div className="sidebar">
      <div className="naviagte">
        <Link to={`/?id=${userId}`}>home</Link>
      </div>
      <div className="library">
        <h4>Playlist</h4>
        <ul className="playlist__list">
          <li>
            <Link to="/">playlistname</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
