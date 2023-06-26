import React, { useEffect, useRef, useState } from "react";
import { data } from "./data";
import axios from "axios";

export default function ChatRoom(props) {
  //sending

  const urlForChatting = window.location.href;
  const idForChatting = urlForChatting.split("/")[4];

  const [file, setFile] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [talkingTo, setTalkingTo] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/checkTalkingTo", {
        id: idForChatting,
      })
      .then((res) => setTalkingTo(res.data));
  });

  const sendMessage = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("message", message);
    data.append("username", props.username);
    data.append("profilePic", props.profilePic);
    data.append("image", file);
    data.append("id", idForChatting);
    data.append("idTwo", props.id);
    data.append("to", talkingTo);

    axios
      .post("http://localhost:5000/sendMessage", data)
      .then((res) => console.log(""));

    setFile();
    setMessage("");
  };

  const [imageThing, setImageThing] = useState("");
  const closeImage = () => {
    document.getElementById("imageView").style.display = "none";
  };
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
  const openImage = (img) => {
    setImageThing(img);
    document.getElementById("imageView").style.display = "flex";
  };
  const messageScroll = useRef(null);

  useEffect(() => {
    messageScroll.current.scrollTop = messageScroll.current.scrollHeight;
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getMessages", {
        id: idForChatting,
        idTwo: props.id,
      })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((error) => {
        console.error("Error retrieving messages");
      });
  });

  return (
    <div className="chatroom">
      <h4
        style={{
          color: "white",
          height: "40px",
          display: "flex",
          alignItems: "center",
          fontSize: "20px",
          backgroundColor: "rgb(35, 35, 35)",
          paddingLeft: "5%",
          fontWeight: "bold",
        }}
      >
        {" "}
        Welcome {props.username} | Talking With {talkingTo}
      </h4>
      <div id="imageView">
        <img src={imageThing} alt="image" />
        <button
          style={{
            position: "absolute",
            top: "2%",
            right: "2%",
            padding: "20px",
            cursor: "pointer",
          }}
          onClick={closeImage}
        >
          X
        </button>
      </div>
      <div onClick={phone} id="newPhone" className="phone">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="chatthing" ref={messageScroll} className="chatting">
        {Array.isArray(messages) ? (
          messages
            .filter((chat) => {
              if (chat.username == props.username) {
                return chat.to == talkingTo && chat.username == props.username;
              } else {
                return chat.to == props.username && chat.username == talkingTo;
              }
            })
            .map((chat, index) => (
              <div
                key={index}
                className={`chatter ${
                  chat.username == props.username ? "one" : "two"
                }`}
              >
                <div className="flexchat">
                  <img
                    className="profile"
                    src={chat.profilePicture}
                    onClick={() => openImage(`${chat.profilePicture}`)}
                    alt="image"
                  />
                  <h4>{chat.username}</h4>
                </div>
                <h5>To {chat.to}</h5>
                <h5>From {chat.username}</h5>
                {chat.imageName == "none" ? (
                  <div></div>
                ) : (
                  <>
                    <h6>Image Attached</h6>
                    <img
                      className="imagetest"
                      onClick={() => openImage(`${chat.imageURL}`)}
                      src={chat.imageURL}
                      alt="image"
                    />
                  </>
                )}
              </div>
            ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="inputs">
        <input
          type="file"
          id="fileSend"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "block" }}
        />
        <label
          style={{
            display: "none",
            width: "60px",
            height: "30px",
            borderRadius: "40px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            textAlign: "center",
          }}
          htmlFor="fileSend"
        >
          Choose File
        </label>
        <input
          style={{
            width: "80%",
            height: "30px",
            outline: "none",
            borderRadius: "10px",
            border: "none",
          }}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          style={{
            width: "60px",
            height: "30px",
            borderRadius: "40px",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
