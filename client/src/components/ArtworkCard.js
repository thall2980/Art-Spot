import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const ArtworkCard = ({
  artwork,
  user,
  handleArtworkLike,
  handleArtworkUnlike,
}) => {
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const findID = artwork.user_artwork_likes.find((e) => e.user_id === user.id);

  function handleLike() {
    const newLike = {
      user_id: user.id,
      artwork_id: artwork.id,
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

  return (
    <>
      <Card style={{ width: "30rem" }} className="artwork-card">
        <Link to={`/artwork/${artwork.id}`}>
          <Card.Img
            src={artwork.image}
            alt={artwork.title}
            className="artwork-card-img"
          />
        </Link>
        <div className="like-info">
          <Card.Title className="artworkTitle" style={{ margin: "1rem" }}>
            {artwork.title} ({artwork.year})
          </Card.Title>
          <Card.Text className="artork-card-text" style={{ margin: "1rem" }}>
            {artwork.style}
          </Card.Text>
        </div>
        <div className="like-info">
          <Card.Text className="artork-card-text" style={{ margin: "1rem" }}>
            {artwork.user_artwork_likes.length}{" "}
            {artwork.user_artwork_likes.length === 1 ? "Like " : "Likes "}
            <br />
          </Card.Text>
          {findID ? (
            <button className="likeButton" onClick={handleUnlike}>
              ❤️
            </button>
          ) : (
            <button className="likeButton" onClick={handleLike}>
              🤍
            </button>
          )}
        </div>
      </Card>
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
    </>
  );
};

export default ArtworkCard;
