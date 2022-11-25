import React from "react";
import { Link } from "react-router-dom";
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
  const artist = artists.filter((e) => String(e.id) === id)[0];

  const userArt = artist?.artworks?.map((artwork) => {
    return (
      <div key={artwork.id}>
        <Link to={`/artwork/${artwork.id}`}>
          <img src={artwork.image} alt={artwork.title} />
        </Link>
        <p>{artwork.title}</p>
      </div>
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
    <>
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
      {userArt}
    </>
  );
};

export default ArtistProfile;
