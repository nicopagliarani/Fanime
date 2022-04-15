import React from "react";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import { useContext, useEffect } from "react";
import "../Css/Comment.css";
import "../Css/DetailAnimePage.css";

export function Comment({ animeName }) {
  const [backendComments, setBackendComments] = useState([]);
  const [getBackendComments, setGetBackendComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { user, removeUserFromContext } = useContext(AuthContext);

  const getCreatedComment = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getComments/${animeName}`
      );
      const data = response.data;
      setGetBackendComments(data.showComments);
    } catch (err) {
      console.log("We got an error");
      console.error(err);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getCreatedComment();
  }, []);

  const clickHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${API_BASE_URL}/api/createComment`, {
      name: user.username,
      comment,
      animeName,
    });
    const data = response.data;
    console.log(data);
    setName("");
    setComment("");
    getCreatedComment();
  };

  return (
    <div className="holeComments">
      <h2>Comment Section</h2>
      <div className="comment-flex">
        <form>
          <textarea
            style={{
              width: "400px",
              height: "50px",
              fontSize: "1.2rem",
              outline: "none",
            }}
            className="textArea"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            name="comment"
          ></textarea>
          <button className="BtnSubmitComment" onClick={(e) => clickHandler(e)}>
            <span className="BtnSubmitCommentSpan">Submit</span>
          </button>
        </form>
      </div>
      <div>
        {getBackendComments.map((e) => {
          return (
            <div key={e._id} className="commentList">
              <h3> {e.name}:</h3>
              <p>{e.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
