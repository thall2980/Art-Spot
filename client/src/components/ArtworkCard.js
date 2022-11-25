import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ArtworkCard = ({
  artwork,
  user,
  handleArtworkLike,
  handleArtworkUnlike,
}) => {
  const [errors, setErrors] = useState([]);

  const findID = artwork.user_artwork_likes.find((e) => e.user_id === user.id);

  function handleLike() {
    const newLike = {
      user_id: user.id,
      artwork_id: artwork.id,
    };
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
      <Link to={`/artwork/${artwork.id}`}>
        <img src={artwork.image} alt={artwork.title} />
      </Link>
      <h1>
        {artwork.title} ({artwork.year})
      </h1>
      <p>{artwork.style}</p>
      <div>
        <p>
          {artwork.user_artwork_likes.length}{" "}
          {artwork.user_artwork_likes.length === 1 ? "Like" : "Likes"}
        </p>
        {findID ? (
          <button onClick={handleUnlike}>♥</button>
        ) : (
          <button onClick={handleLike}>♡</button>
        )}
      </div>
    </>
  );
};

export default ArtworkCard;
