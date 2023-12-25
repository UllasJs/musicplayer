import React, { useState } from "react";
import Sidebar from "../../component/sidebar/sidebar";
import "./admin.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Admin() {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  axios
    .get("http://localhost:2000/user/getuser")
    .then((res) => {
      setUsers(res.data.getresult);
    })
    .catch((err) => {
      console.log(err);
    });

  const delteBtn = document.querySelector(".dlt__btn");
  

  return (
    <div className="admin_panel_page_main">
      <Sidebar />
      <div className="users__">
        <h1>Users</h1>
        <ul className="users__list">
          {users.map((user) => (
            <li key={user._id}>
              <p>{user.firstname + " " + user.lastname}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.role}</p>
              <button
                onClick={() => {
                  if (user.role === "admin") {
                    delteBtn.style.display = "none";
                  } else {
                    axios.delete(
                      `http://localhost:2000/user/deleteuser/${user._id}`
                    );
                  }
                }}
                className="dlt__btn"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
