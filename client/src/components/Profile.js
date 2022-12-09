import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import AddArtworkForm from "./AddArtworkForm";
import EditInfoForm from "./EditInfoForm";

const Profile = ({
  user,
  artwork,
  follows,
  setUser,
  handleAddArt,
  handleDeleteArt,
  handleUpdateUser,
  logOut,
  handleDeleteAcccount
}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userArt2 = artwork.filter((art) => art.user.id === user.id);
  const userArt = userArt2.map((artwork) => {
    return (
      <Card className="artwork-card2" key={artwork.id}>
        <Link to={`/artwork/${artwork.id}`}>
          <Card.Img
            className="artwork-card-img"
            src={artwork.image}
            alt={artwork.title}
          />
        </Link>
        <h4 className="artistName">{artwork.title}</h4>
        <div className="deleteBtnContainer">
          <button
            className="button-54"
            onClick={() => handleDeleteClick(artwork.id)}
          >
            Delete
          </button>
        </div>
      </Card>
    );
  });

  //////////////////////////////////
  const following = follows.filter((follow) => follow.follower_id === user.id);
  const displayUserFollowing = following.map((follow) => {
    return (
      <div className="followedArtistPicName" key={follow.id}>
        <Link to={`/artists/${follow.following_id}`}>
          <img
            className="followedArtistPic"
            src={follow.following.profile_img}
            alt={follow.following.username}
          />
        </Link>
        <h3 className="centered">{follow.following.username}</h3>
      </div>
    );
  });

  function handleDeleteClick(id) {
    confirmAlert({
      title: "Delete Art",
      message: "Are you sure you want to deprive the world of this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`/artworks/${id}`, {
              method: "DELETE",
            }).then((res) => {
              if (res.ok) {
                handleDeleteArt(id);
              }
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  function handleDeleteProfileClick() {
    confirmAlert({
      title: "Delete Account",
      message: "Are you sure you want to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`/users/${user?.id}`, {
              method: "DELETE",
            });
            fetch("/logout", {
              method: "DELETE",
            });
            handleDeleteAcccount(user?.id)
            logOut()
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  function handleStopEdit() {
    setShow((prev) => !prev);
  }

  return (
    <>
      <div className="singlePageImgBackground">
        <div className="artistProfileContainer">
          <div className="artistProfilePicContainer">
            <div>
              <div className="centered">
                <h1>Welcome, {user.username}!</h1>
                <img
                  className="profilePic"
                  src={user.profile_img}
                  alt="profile"
                />
              </div>
            </div>
            <div className="profileButtonsContainer">
              <button
                className="profileButton"
                onClick={handleDeleteProfileClick}
              >
                Delete Account
              </button>
              <button className="profileButton" onClick={() => handleShow()}>
                Edit Account Info
              </button>
            </div>
          </div>
          <div className="artistProfileInfo">
            <div className="centered">
              <h1>Info</h1>
            </div>
            <br />
            <h3>First Name: {user.first_name}</h3>
            <h3>Last Name: {user.last_name}</h3>
            <h3>Email: {user.email}</h3>
          </div>
          <div className="artistProfileBio">
            <div className="centered">
              <h2>Bio</h2>
            </div>
            <br />
            <h5>{user.bio}</h5>{" "}
          </div>
        </div>
        <div className="followedWithForm">
          <div className="followedArtistsContainer">
            <h2 className="followedArtistTitle">Followed Artists</h2>
            <div className="yourArtContainer">{displayUserFollowing}</div>
          </div>
          <AddArtworkForm user={user} handleAddArt={handleAddArt} />
        </div>
        <div className="userArtProfileContainer">
          <h2 className="yourArtTitle">Your Artwork</h2>
          <div className="yourArtContainer">{userArt}</div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditInfoForm
            user={user}
            handleUpdateUser={handleUpdateUser}
            handleStopEdit={handleStopEdit}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
