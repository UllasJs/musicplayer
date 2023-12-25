import { useEffect, useState } from "react";
import "./music.css";
import axios from "axios";

function Music({ userId, song }) {
  const [tracks, setTracks] = useState([]);
  const [like, setLike] = useState(0);
  const [Dislike, setDislike] = useState(0)
  const [id, setId] = useState("");

  const [songname, setSongname] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2000/track/gettrack/")
      .then((res) => {
        setTracks(res.data.getresult);
        console.log(song);
      })
      .catch((error) => {
        console.log(error);
      });
    tracks.map((track) => {
      if (track.music === song) {
        setSongname(track.music);
        setLike(track.likes);
        setId(track._id);
      }
    });
  }, [song, userId]);

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
    DislikeBTN.style.display = "none";
  };

  const dislike = () => {
    axios
      .put(`http://localhost:2000/track/edittrack/${id}`, { dislikes: Dislike + 1 })
      .then((res) => {
        console.log(res.data.getresult);
        setDislike(Dislike + 1);
      })
      .catch((err) => {
        console.log(err);
      });

    likeBTN.style.display = "none";
    DislikeBTN.style.display = "none";
  };

  return (
    <div className="player">
      <div className="player_inside">
        <div className="song_dets">
          <p>{song}</p>
          <p>| {like} likes </p>
          <p>| {Dislike} dislikes </p>
        </div>
        <div className="audioTag">
          <audio
            key={song}
            controls
            src={`http://localhost:2000/track/music/${songname}`}
          ></audio>
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
