import React, { useRef, useState } from "react";
import "./music.css";

function Music({ song }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  console.log(`../../server/music/${song}`);

  const src = `../../server/music/${song}`;

  return (
    <div className="player">
      <audio ref={audioRef} src={src}></audio>
      <div className="trackdet">
        <p>{song}</p>
      </div>
      <div className="player_controlls">
        <button>Pre</button>
        <button
          onClick={() => {
            audioRef.current.play();
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default Music;
