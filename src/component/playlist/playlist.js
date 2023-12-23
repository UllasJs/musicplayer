import React from "react";
import "./playlist.css";
import playlistimg from "../../assets/playlistimage.jpeg";

function Playlist() {
  return (
    <div className="playlist__button">
      <div className="playlist_image">
        <img src={playlistimg} alt="" />
      </div>
      <div className="playlist_name">
        <p>playlistname</p>
      </div>
    </div>
  );
}

export default Playlist;
