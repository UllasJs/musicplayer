import React, { useState } from "react";
import "./styles/signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({});

  const nav = useNavigate();

  const OnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmithandler = (e) => {
    e.preventDefault();

    console.log(form);

    axios
      .post("http://localhost:2000/user/adduser", form)
      .then((res) => {
        setForm(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    // nav("/home");
  };

  return (
    <div className="signup">
      <form>
        <label htmlFor="firstname">Firstname :</label>
        <input
          type="text"
          onChange={OnChange}
          name="firstname"
          placeholder="first name"
          required
        />
        <label htmlFor="lastname">Lastname :</label>
        <input
          type="text"
          onChange={OnChange}
          name="lastname"
          placeholder="last name"
          required
        />
        <label htmlFor="phone">Phone :</label>
        <input
          type="Number"
          onChange={OnChange}
          placeholder="phone number"
          name="phone"
          required
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          onChange={OnChange}
          placeholder="email"
          name="email"
          required
        />
        <label htmlFor="password">Password :</label>
        <input
          onChange={OnChange}
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <button onClick={onSubmithandler}>Sign Up</button>
      </form>
      <div className="gologin">
      <p>Are you already a user ?</p>
      <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default Signup;
