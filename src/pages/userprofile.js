import React, { useEffect, useState } from "react";
import "./styles/profile.css";
import Sidebar from "../component/sidebar/sidebar";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function Userprofile() {
  const location = useLocation();
  const [user, setUser] = useState({});

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  useEffect(() => {
    axios
      .get(`http://localhost:2000/user/getuserbyid/${userId}`)
      .then((res) => {
        setUser(res.data.getresult);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const EditUser = () => {
    if (fname !== "") {
      user.firstname = fname;
    }
    if (lname !== "") {
      user.lastname = lname;
    }
    if (email !== "") {
      user.email = email;
    }
    if (phone !== "") {
      user.phone = phone;
    }

    axios
      .put(`http://localhost:2000/user/updateuser/${userId}`, user)
      .then((res) => {
        console.log(res.data);
      });
  };

  const changeRoleCreator = (e) => {
    e.preventDefault();

    user.role = "creator";
    axios
      .put(`http://localhost:2000/user/updateuser/${userId}`, user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const adminPanel = document.querySelector(".admin_panel");
  const roleBtn = document.querySelector(".creator")

  if (user.role === "admin") {
    adminPanel.style.display = "flex";
    roleBtn.style.display = "none";
  }

  return (
    <div className="profilepage">
      <Sidebar />
      <Link to={`/admin/?id=${userId}`} className="admin_panel">
        Admin
      </Link>
      <div className="profile_menu">
        <h1>Profile</h1>
        <h3>Welcome, {user.firstname + " " + user.lastname}</h3>
        <div className="user_details">
          <div className="fields">
            <p>First name </p>
            <input
              type="text"
              name="firstname"
              placeholder={user.firstname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
          </div>
          <div className="fields">
            <p>Last name </p>
            <input
              type="text"
              name="lastname"
              placeholder={user.lastname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
          </div>
          <div className="fields">
            <p>Email </p>
            <input
              type="email"
              name="email"
              placeholder={user.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="fields">
            <p>Phone </p>
            <input
              type="number"
              name="phone"
              placeholder={user.phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="fields creator">
          <p>Role</p>
          <button onClick={changeRoleCreator}>Be a Creator</button>
        </div>
        <div className="editUser">
          <button onClick={EditUser} className="edit_button">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
