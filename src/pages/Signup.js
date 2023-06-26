import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("fullName", fullName);
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("image", file);

    axios
      .post("http://localhost:5000/signup", data)
      .then((res) => setError(res.data));
  };

  return (
    <div className="signup">
      <form onSubmit={submitHandler} className="signupdiv">
        <h2>MTT Chat | Sign Up</h2>
        <p>Sign Up For MTT Chat.</p>

        <h6>Upload Your Profile Picture</h6>

        <input
          type="file"
          style={{ border: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <h4>Full Name</h4>
        <input type="text" onChange={(e) => setFullName(e.target.value)} />

        <h4>Username</h4>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />

        <h4>Email</h4>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />

        <h4>Password</h4>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

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
        <button type="submit">Submit</button>
        <Link style={{ color: "white" }} to="/signin">
          Have An Account? Sign In.
        </Link>
      </form>
      <img src="images/signup.jpg" alt="image" />
    </div>
  );
}
