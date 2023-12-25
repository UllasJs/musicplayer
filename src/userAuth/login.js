import "./styles/login.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [users, setUsers] = useState({});

  const [Token, setToken] = useState("");

  const LogUser = async (e) => {
    e.preventDefault();

    try {
      // Sign in and get the token
      const signInResponse = await axios.post(
        "http://localhost:2000/user/signin",
        {
          email,
          password: pass,
        }
      );

      const token = signInResponse.data.token;
      console.log("Token:", token);

      // Set the token in the state or secure storage
      setToken(token);

      // Verify the token
      const verifyTokenResponse = await axios.post(
        "http://localhost:2000/user/verifyToken",
        { token }
      );

      // Log the decoded token (assuming verifyTokenResponse contains the decoded token)
      console.log("Decoded Token:", verifyTokenResponse.data);
      if (verifyTokenResponse.data._id) {
        nav(`/?id=${verifyTokenResponse.data._id}&token=${token}`)
      }
    } catch (error) {
      console.error("Error during login or token verification:", error);

      // Handle errors, e.g., show an error message to the user
    }



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
