import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar(props) {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const [yourFriends, setYourFriends] = useState([{ "": "" }]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getFriends", {
        username: props.username,
      })
      .then((res) => {
        setYourFriends(res.data);
      });
  });
  useEffect(() => {
    axios
      .post("http://localhost:5000/getPeople", {})
      .then((res) => setPeople(res.data));
  });
  function logOut() {
    axios
      .post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        alert("Something Went Wrong Please Try Again");
      });
  }

  function addFriend(username) {
    axios
      .post("http://localhost:5000/addFriend", {
        friendName: username,
        username: props.username,
      })
      .then((res) => alert(res.data));
  }

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
    <div className="sideBar" id="sideBar">
      <div onClick={phone} id="newPhone" className="phone">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2>MTT Chat</h2>
      <button onClick={logOut}>Log Out</button>
      <h2>Chats</h2>
      <input
        type="text"
        style={{ height: "30px", padding: "10px" }}
        placeholder="Search For Someone | Add Someone"
        onChange={(e) => setSearch(e.target.value)}
      />
      {Array.isArray(people) ? (
        people
          .filter((person) => {
            return search == person.username;
          })
          .map((person, index) => (
            <div
              key={index}
              onClick={() => addFriend(person.username, person.id)}
              className="chatFirst"
            >
              <img className="profile" src="/images/signup.jpg" alt="image" />
              <h2>{person.username}</h2>
            </div>
          ))
      ) : (
        <div>Loading...</div>
      )}
      <div className="outline"></div>
      <div className="chats">
        {Array.isArray(yourFriends) ? (
          yourFriends.map((person, index) => {
            if (person === null) {
              return null;
            }

            const { id, image, username } = person;
            const imagePath =
              image !== null && image !== "null"
                ? `https://firebasestorage.googleapis.com/v0/b/mttchat-7b8a5.appspot.com/o/${image}?alt=media&`
                : "/images/signup.jpg";

            return (
              <div
                key={index}
                onClick={() => navigate(`/person/${id}`)}
                className="chatFirst"
              >
                <img className="profile" src={imagePath} alt="image" />
                <h2>{username !== null ? username : "No Friends Yet"}</h2>
              </div>
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}
