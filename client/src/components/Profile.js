import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Card from "react-bootstrap/Card"
import { useHistory } from "react-router-dom";
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
}) => {
  const history = useHistory();
  const [defaultState, setDefaultState] = useState(true);
  const userArt2 = artwork.filter((art) => art.user.id === user.id);
  const userArt = userArt2.map((artwork) => {
    return (
      <Card className="artwork-card2" key={artwork.id}>
        <Link to={`/artwork/${artwork.id}`}>
          <Card.Img className="artwork-card-img" src={artwork.image} alt={artwork.title} />
        </Link>
        <h4 className="artistName">{artwork.title}</h4>
        <div className="deleteBtnContainer">
        <button className="button-54" onClick={() => handleDeleteClick(artwork.id)}>Delete</button></div>
      </Card>
    );
  });

  //////////////////////////////////
  const following = follows.filter((follow) => follow.follower_id === user.id);
  const displayUserFollowing = following.map((follow) => {
    return (
      <div key={follow.id}>
        <Link to={`/artists/${follow.following_id}`}>
          <img 
            src={follow.following.profile_img}
            alt={follow.following.username}
          />
        </Link>
        <h3>{follow.following.username}</h3>
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
            history.push(`/`);
            setUser(null);
            window.location.reload();
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  function handleStopEdit() {
    setDefaultState((prev) => !prev)
  }

  return (
    <div className="singlePageImgBackground">
      <h1>Welcome, {user.username}!</h1>
      <img src={user.profile_img} alt="profile" />
      <button onClick={handleDeleteProfileClick}>Delete Account</button>
      <button onClick={() => setDefaultState((defaultState) => !defaultState)}>
        Edit Account Info
      </button>
      {defaultState ? (
        <>
          <h2>Info</h2>
          <li>First Name: {user.first_name}</li>
          <li>Last Name: {user.last_name}</li>
          <li>Email: {user.email}</li>
          <h2>Bio</h2>
          <p>{user.bio}</p>{" "}
        </>
      ) : (
        <EditInfoForm user={user} handleUpdateUser={handleUpdateUser} handleStopEdit={handleStopEdit}/>
      )}

      <AddArtworkForm user={user} handleAddArt={handleAddArt} />

      <h2>Followed Artists</h2>
      <div className="yourArtContainer">{displayUserFollowing}</div>

      <h2 >Your Artwork</h2>
      <div className="yourArtContainer">{userArt}</div>
    </div>
  );
};

export default Profile;
