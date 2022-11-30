import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommentContainer from "./CommentContainer";
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const ArtworkWithComments = ({
  artwork,
  user,
  comments,
  handleArtworkLike,
  handleArtworkUnlike,
  handleAddComment,
  onDeleteComment,
  handleUpdateComment,
  handleCommentLike,
  handleCommentUnlike,
}) => {
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const art = artwork.filter((e) => String(e.id) === id)[0]; ///controls enitre component info

  const heartDisplayed = art?.user_artwork_likes.find(
    (e) => e.user_id === user.id
  );
  const findID = art?.user_artwork_likes.find((e) => e.user_id === user.id);

  function handleLike() {
    const newLike = {
      user_id: user.id,
      artwork_id: art.id,
    };
    if (!user) handleShow();
    fetch("/user_artwork_likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLike),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          handleArtworkLike(data.artwork_id);
        });
      } else {
        res.json().then((data) => {
          setErrors(Object.entries(data.errors).map((e) => ` ${e[1]}`));
        });
      }
    });
  }

  function handleUnlike() {
    fetch(`/user_artwork_likes/${findID?.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          handleArtworkUnlike(data);
        });
      }
    });
  }
  //////////////////////////////////////end of like Artwork Functions////////////////////////////////

  return (
    <Container>
      <div className="singlePageImgContainer">
        <h1 className="artistName">
          {art?.title} - <Link className="nameLink" style={{ textDecoration: 'none' }} to={`/artists/${art?.user?.id}`}>{art?.user.username}</Link>
        </h1>
        <img className="singleImagePage" src={art?.image} alt={art?.title} />
      </div>
      <div className="like-info2">
        <h3 style={{padding:20}}>
          {art?.user_artwork_likes.length}{" "}
          {art?.user_artwork_likes.length === 1 ? "Like" : "Likes"}
        </h3>
        {heartDisplayed ? (
          <button className="likeButton2" onClick={handleUnlike}>
          ❤️
        </button>
      ) : (
        <button className="likeButton2" onClick={handleLike}>
          🤍
        </button>
      )}
      </div>
      <CommentContainer
        user={user}
        art={art}
        comments={comments}
        handleAddComment={handleAddComment}
        onDeleteComment={onDeleteComment}
        handleUpdateComment={handleUpdateComment}
        handleCommentLike={handleCommentLike}
        handleCommentUnlike={handleCommentUnlike}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Looks like you're not logged in!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login or create an account to engage with the community.</Modal.Body>
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
    </Container>
  );
};

export default ArtworkWithComments;
