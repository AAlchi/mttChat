import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PersonPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

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
        }
      });
  });

  const phone = () => {
    let phone = document.getElementById("sideBar");
    let newPhone = document.getElementById("newPhone");

    if (phone.style.display == "flex") {
      phone.style.display = "none";
      newPhone.style.display = "flex";
    } else {
      phone.style.display = "flex";
      newPhone.style.display = "flex";
    }
  };

  return (
    <>
      <div className="homepage">
        <Sidebar profilePic={profilePic} username={username} />
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
            width: "100%",
            paddingTop: "50px",
          }}
        >
          <div onClick={phone} id="newPhone" className="phone">
            Click To Talk With Someone
          </div>
          All you have to do is start a conversation.
        </div>
      </div>
    </>
  );
}
