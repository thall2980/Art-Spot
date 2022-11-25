import React from "react";
import { useState } from "react";

const CommentCard = ({
  comment,
  user,
  onDeleteComment,
  handleUpdateComment,
  handleCommentLike,
  handleCommentUnlike,
}) => {
  const [editShown, setEditShown] = useState(false);
  const [commentEdit, setCommentEdit] = useState(comment.text);
  const [errors, setErrors] = useState([]);

  const findID = comment?.user_comment_likes.find((e) => e.user_id === user.id);

  function handleSubmit(e) {
    e.preventDefault();
    const newComment = {
      text: commentEdit,
    };

    fetch(`/comments/${comment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }).then((res) => {
      if (res.ok) {
        res.json().then((comment) => {
          handleUpdateComment(comment);
          setEditShown((editShown) => !editShown);
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function handleDeleteClick() {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        onDeleteComment(comment.id);
      }
    });
  }

  function handleLike() {
    const newLike = {
      user_id: user.id,
      comment_id: comment.id,
    };

    fetch("/user_comment_likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLike),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          handleCommentLike(data.comment_id);
        });
      } else {
        res.json().then((data) => {
          setErrors(Object.entries(data.errors).map((e) => ` ${e[1]}`));
        });
      }
    });
  }

  function handleUnlike() {
    fetch(`/user_comment_likes/${findID?.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          handleCommentUnlike(data);
        });
      }
    });
  }

  return (
    <>
      {editShown ? (
        <>
          <form onSubmit={handleSubmit}>
            <textarea
              value={commentEdit}
              type="text"
              onChange={(e) => setCommentEdit(e.target.value)}
            />
            <button type="submit">Submit Edit</button>
          </form>
          <button onClick={() => setEditShown((editShown) => !editShown)}>
            Cancel
          </button>
        </>
      ) : (
        <div>
          <h4>{comment.user.username}</h4>
          <p>{comment.text}</p>
          <p>
            {comment.user_comment_likes.length}{" "}
            {comment.user_comment_likes.length === 1 ? "Like" : "Likes"}
          </p>
          {user.id === comment.user.id ? (
            <button onClick={handleDeleteClick}>X</button>
          ) : null}
          {user.id === comment.user.id ? (
            <button onClick={() => setEditShown((editShown) => !editShown)}>
              Edit
            </button>
          ) : null}
          {findID ? (
            <button onClick={handleUnlike}>♥</button>
          ) : (
            <button onClick={handleLike}>♡</button>
          )}
        </div>
      )}
    </>
  );
};

export default CommentCard;
