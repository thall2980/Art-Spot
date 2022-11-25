import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const userArt = user.artworks?.map((artwork) => {
    return (
      <div key={artwork.id}>
        <Link to={`/artwork/${artwork.id}`}>
        <img src={artwork.image} alt={artwork.title} />
        </Link>
        <p>{artwork.title}</p>
      </div>
    );
  });

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

      <h2>Your Artwork</h2>
      {userArt}
    </>
  );
};

export default Profile;
