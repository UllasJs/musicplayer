import { useEffect, useState } from "react";
import "./music.css";
import axios from "axios";

function Music({ song }) {
  const src = `http://localhost:2000/track/music/${song}`;
  const [tracks, setTracks] = useState([]);
  const [like, setLike] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2000/track/gettrack/")
      .then((res) => {
        setTracks(res.data.getresult);
      })
      .catch((error) => {
        console.log(error);
      });
    tracks.map((track) => {
      if ((track.music = song)) {
        setLike(track.likes);
        setId(track._id);
      }
    });
  }, [song]);

  const DislikeBTN = document.getElementById("dislikeBtn");
  const likeBTN = document.getElementById("likeBtn");

  const addlike = () => {
    axios
      .put(`http://localhost:2000/track/edittrack/${id}`, { likes: like + 1 })
      .then((res) => {
        console.log(res.data.getresult);
        setLike(like + 1);
      })
      .catch((err) => {
        console.log(err);
      });

    likeBTN.style.display = "none";
    DislikeBTN.style.display = "block";
  };

  const dislike = () => {
    axios
      .put(`http://localhost:2000/track/edittrack/${id}`, { likes: like - 1 })
      .then((res) => {
        console.log(res.data.getresult);
        setLike(like - 1);
      })
      .catch((err) => {
        console.log(err);
      });

    likeBTN.style.display = "block";
    DislikeBTN.style.display = "none";
  };

  return (
    <div className="player">
      <div className="player_inside">
        <div className="song_dets">
          <p>{song}</p>
          <p>| {like} likes </p>
        </div>
        <div className="audioTag">
          <audio controls src={src}></audio>
        </div>
        <div className="like_dislike">
          <button id="likeBtn" onClick={addlike}>
            Like
          </button>
          <button id="dislikeBtn" onClick={dislike}>
            DisLike
          </button>
        </div>
      </div>
    </div>
  );
}

export default Music;
