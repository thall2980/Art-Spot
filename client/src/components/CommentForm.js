import React from "react";
import { useState } from "react";

const CommentForm = ({ user, art, handleAddComment }) => {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const newComment = {
      user_id: user.id,
      artwork_id: art?.id,
      text: comment,
      likes: 0,
    };

    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }).then((res) => {
      if (res.ok) {
        res.json().then((comment) => {
          handleAddComment(comment);
          setComment("");
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
