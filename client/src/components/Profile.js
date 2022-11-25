import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddArtworkForm from "./AddArtworkForm";

const Profile = ({ user, artwork, follows, handleAddArt, handleDeleteArt }) => {
  const userArt2 = artwork.filter((art) => art.user.id === user.id);
  const userArt = userArt2.map((artwork) => {
    return (
      <div key={artwork.id}>
        <Link to={`/artwork/${artwork.id}`}>
          <img src={artwork.image} alt={artwork.title} />
        </Link>
        <p>{artwork.title}</p>
        <button onClick={() => handleDeleteClick(artwork.id)}>X</button>
      </div>
    );
  });

  //////////////////////////////////
  const following = follows.filter((follow) => follow.follower_id === user.id)
  const displayUserFollowing = following.map((follow) => {
    return <div key={follow.id}>
      <Link to={`/artists/${follow.following_id}`}>
      <img src={follow.following.profile_img} alt={follow.following.username} />
      </Link>
      <h3>{follow.following.username}</h3>
    </div>
  })

  function handleDeleteClick(id) {
    fetch(`/artworks/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        handleDeleteArt(id);
      }
    });
  }

  return (
    <>
      <h1>Welcome back, {user.username}!</h1>
      <img src={user.profile_img} alt="profile" />
      <h2>Info</h2>
      <li>First Name: {user.first_name}</li>
      <li>Last Name: {user.last_name}</li>
      <li>Email: {user.email}</li>
      <h2>Bio</h2>
      <p>{user.bio}</p>

      <AddArtworkForm user={user} handleAddArt={handleAddArt} />

      <h2>Followed Artists</h2>
      {displayUserFollowing}

      <h2>Your Artwork</h2>
      {userArt}
    </>
  );
};

export default Profile;
