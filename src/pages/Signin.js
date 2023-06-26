import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/signin",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data == "Wrong Username or Password") {
          setError("Wrong Username or Password");
        } else {
          navigate("/");
        }
      });
  };

  return (
    <div className="signup">
      <div className="signupdiv">
        <h2>MTT Chat | Sign In</h2>
        <p>Sign Up For MTT Chat.</p>

        <h4>Username</h4>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <h4>Password</h4>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <span
          style={{
            color: "red",
            fontWeight: "bold",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {error}
        </span>
        <button onClick={handleSubmit}>Submit</button>
        <Link style={{ color: "white" }} to="/signup">
          No Account? Sign Up.
        </Link>
      </div>
      <img src="images/signup.jpg" alt="image" />
    </div>
  );
}
