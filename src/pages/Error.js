import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <center>
        <h2>
          Sorry. No page here :(. Try going to{" "}
          <Link style={{ color: "white" }} to="/">
            chat with someone
          </Link>
        </h2>
      </center>
    </div>
  );
}
