import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    if (!user) handleShow();
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
        <div className="singleCommentDiv">
          <div className="nameCommentDiv">
            <h4 className="commentName">
              <Link
                style={{ textDecoration: "none" }}
                to={`/artists/${comment.user.id}`}
              >
                <img
                  className="commentPic"
                  src={comment.user.profile_img}
                  alt={comment.user.username}
                />{" "}
                {comment.user.username}
              </Link>
            </h4>
            <p className="commentText">{comment.text}</p>
          </div>
          <div className="rightSideComment">
            {user.id === comment.user.id ? (
              <div className="editDeleteDiv">
                <button onClick={() => setEditShown((editShown) => !editShown)}>
                ✏️
                </button>
                <button onClick={handleDeleteClick}>❌</button>{" "}
              </div>
            ) : (
              <div className="editDeleteDiv" />
            )}
            <div className="commentLikeDiv">
              <p className="commentLikes">
                {comment.user_comment_likes.length}{" "}
                {comment.user_comment_likes.length === 1 ? "Like" : "Likes"}{" "}
              </p>
              {findID ? (
                <button className="commentLikeButton" onClick={handleUnlike}>
                  ❤️
                </button>
              ) : (
                <button className="commentLikeButton" onClick={handleLike}>
                  🤍
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Looks like you're not logged in!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please login or create an account to engage with the community.
        </Modal.Body>
        <Modal.Footer>
          <NavLink to="/login">
            <Button variant="secondary" onClick={handleClose}>
              Login
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button variant="primary" onClick={handleClose}>
              Create account
            </Button>
          </NavLink>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentCard;
