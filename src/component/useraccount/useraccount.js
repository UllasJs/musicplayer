import React, { useEffect, useState } from "react";
import "./useraccount.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
function Useraccount() {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  // Use URLSearchParams to get the value of id from the search parameters
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");
  let user = {};

  useEffect(() => {
    axios
      .get("http://localhost:2000/user/getuser")
      .then((res) => {
        setUsers(res.data.getresult);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);
  // console.log("true");

  // eslint-disable-next-line array-callback-return
  users.map((item) => {
    if (item._id === userId) {
      user = item;
    }
  });

  return (
    <div className="user__acc">
      <Link to={`/userProfile/?id=${userId}`}>
        {user.firstname + " " + user.lastname}
      </Link>
    </div>
  );
}

export default Useraccount;
