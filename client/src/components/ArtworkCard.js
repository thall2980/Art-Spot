import React from "react";
import { useState } from "react";

const ArtworkCard = ({ artwork, user, handleArtworkLike }) => {
  const [errors, setErrors] = useState([]);
  const [isDefaultButton, setIsDefaultButton] = useState(true);
  const [newLikeID, setNewLikeID] = useState(0);

  const heartDisplayed = artwork.user_artwork_likes.find(
    (e) => e.user_id === user.id && e.artwork_id === artwork.id
  );

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
          setNewLikeID(data.id);
          setIsDefaultButton((isDefaultButton) => !isDefaultButton);
        });
      } else {
        res.json().then((data) => {
          setErrors(Object.entries(data.errors).map((e) => ` ${e[1]}`));
        });
      }
    });
  }
  
  const findID = artwork.user_artwork_likes.find(
    (e) => e.user_id === user.id && e.artwork_id === artwork.id
  )?.id;

  function handleUnlike() {
    newLikeID
      ? fetch(`/user_artwork_likes/${newLikeID}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            setIsDefaultButton((isDefaultButton) => !isDefaultButton);
          }
        })
      : fetch(`/user_artwork_likes/${findID}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            setIsDefaultButton((isDefaultButton) => !isDefaultButton);
          }
        });
  }

  function likeButtonLogic() {
    if (heartDisplayed && isDefaultButton) {
      return <button onClick={handleUnlike}>♥</button>;
    } else if (heartDisplayed && !isDefaultButton) {
      return <button onClick={handleLike}>♡</button>;
    } else if (!heartDisplayed && isDefaultButton) {
      return <button onClick={handleLike}>♡</button>;
    } else if (!heartDisplayed && !isDefaultButton) {
      return <button onClick={handleUnlike}>♥</button>;
    }
  }

  return (
    <>
      <img src={artwork.image} alt={artwork.title} />
      <h1>
        {artwork.title} ({artwork.year})
      </h1>
      <p>{artwork.style}</p>
      <div>
        <p>{artwork.user_artwork_likes.length} Likes</p>
        {likeButtonLogic()}
      </div>
    </>
  );
};

export default ArtworkCard;
