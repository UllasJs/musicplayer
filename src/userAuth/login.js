import "./styles/login.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [users, setUsers] = useState([]);

  const LogUser = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:2000/user/getuser")
      .then((res) => {
        setUsers(res.data.getresult);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line array-callback-return
    users.map((user) => {
      // console.log(user);
      if (user.email === email) {
        if (user.password === pass) {
          nav(`/?id=${user._id}`);
        } else {
          alert("Wrong Password!");
        }
      } else {
        // alert("user not found");
      }
    });
  };

  return (
    <div className="login">
      <form>
        <div className="fields">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="Enter email!"
            required
          />
        </div>
        <div className="fields">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            onChange={(event) => {
              setPass(event.target.value);
            }}
            placeholder="Enter Password!"
            required
          />
        </div>
        <button onClick={LogUser}>Login</button>
      </form>
      <p>
        new user ?<Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
