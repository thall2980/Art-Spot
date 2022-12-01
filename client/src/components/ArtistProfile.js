import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ArtistProfile = ({
  artists,
  user,
  follows,
  handleFollow,
  handleUnfollow,
}) => {
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const artist = artists.filter((e) => String(e.id) === id)[0];

  const userArt = artist?.artworks?.map((artwork) => {
    return (
      <Card className="artwork-card" key={artwork.id}>
        <Link to={`/artwork/${artwork.id}`}>
          <Card.Img className="artwork-card-img" src={artwork.image} alt={artwork.title} />
        </Link>
        <Card.Title className="artistName">{artwork.title}</Card.Title>
      </Card>
    );
  });

  const userFollowing = follows.filter((follow) => {
    return (
      follow.follower_id === user?.id && follow.following_id === artist?.id
    );
  });

  function handleFollowClick() {
    const newFollow = {
      follower_id: user.id,
      following_id: artist?.id,
    };
    if (!user) handleShow()
    fetch("/follows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFollow),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          handleFollow(data);
        });
      } else {
        res.json().then((data) => {
          setErrors(Object.entries(data.errors).map((e) => ` ${e[1]}`));
        });
      }
    });
  }

  function handleUnfollowClick() {
    fetch(`/follows/${userFollowing[0]?.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        handleUnfollow(userFollowing[0].id);
      }
    });
  }

  return (
    <div className="singlePageImgBackground">
      <div>
        <h1>{artist?.username}</h1>
        <img src={artist?.profile_img} alt="profile" />
      </div>
      {user.id === artist?.id ? null : (
        <>
          {userFollowing?.length ? (
            <button onClick={handleUnfollowClick}>Unfollow</button>
          ) : (
            <button onClick={handleFollowClick}>Follow</button>
          )}
        </>
      )}

      <h2>Info</h2>
      <li>First Name: {artist?.first_name}</li>
      <li>Last Name: {artist?.last_name}</li>
      <li>Email: {artist?.email}</li>

      <h2>Bio</h2>
      <p>{artist?.bio}</p>

      <h2>{artist?.username}'s Artwork</h2>
      <div className="yourArtContainer">{userArt}</div>

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
    </div>
  );
};

export default ArtistProfile;
