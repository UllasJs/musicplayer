import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar/sidebar";
import "./styles/addsong.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
function AddSong() {
  const location = useLocation();
  const [user, setUser] = useState({});

  // Use URLSearchParams to get the value of id from the search parameters
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");
  const [musicForm, setMusicForm] = useState({
    artist: "",
    title: "",
    music: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:2000/user/getuserbyid/${userId}`)
      .then((res) => {
        setUser(res.data.getresult);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const oninputChange = (e) => {
    setMusicForm({
      ...musicForm,
      [e.target.name]: e.target.value,
    });
  };

  const onfileChange = (e) => {
    setMusicForm({
      ...musicForm,
      [e.target.name]: e.target.files[0],
      artist: user.firstname,
    });
  };

  const AddMusicTrack = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("artist", musicForm.artist);
    formData.append("title", musicForm.title);
    formData.append("music", musicForm.music);
    console.log(formData);

    axios
      .post("http://localhost:2000/track/addtrack", formData)
      .then((res) => {
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addsong">
      <Sidebar />
      <div className="add_song">
        <h1>Add Songs</h1>
        <input
          type="text"
          name="title"
          onChange={oninputChange}
          placeholder="title"
        />
        <input
          type="file"
          name="music"
          onChange={onfileChange}
          accept=".mp3"
          placeholder="Add music"
        />
        <button onClick={AddMusicTrack}>Add</button>
      </div>
    </div>
  );
}

export default AddSong;
