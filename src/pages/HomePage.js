import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/checkToken",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data == "wrong") {
          navigate("/signin");
        } else {
          setUsername(res.data.username);
          setProfilePic(res.data.profilePic);
          setId(res.data.id);
        }
      });
  });

  return (
    <>
      <div className="homepage">
        <Sidebar id={id} profilePic={profilePic} username={username} />
        <ChatRoom id={id} profilePic={profilePic} username={username} />
      </div>
    </>
  );
}
