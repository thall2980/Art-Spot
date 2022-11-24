import React from "react";
import { useState } from "react";

const ArtworkCard = ({
  artwork,
  user,
  handleArtworkLike,
  handleArtworkUnlike,
}) => {
  const [errors, setErrors] = useState([]);
  const [isDefaultButton, setIsDefaultButton] = useState(true);
  const [newLikeID, setNewLikeID] = useState(0);

  const heartDisplayed = artwork.user_artwork_likes.find(
    (e) => e.user_id === user.id && e.artwork_id === artwork.id
  );

  console.log(artwork);

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
          handleArtworkLike(data.artwork_id);
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
  );

  function handleUnlike() {
    newLikeID
      ? fetch(`/user_artwork_likes/${newLikeID}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              handleArtworkUnlike(data);
              setIsDefaultButton((isDefaultButton) => !isDefaultButton);
            });
          }
        })
      : fetch(`/user_artwork_likes/${findID?.id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              handleArtworkUnlike(data);
              setIsDefaultButton((isDefaultButton) => !isDefaultButton);
            });
          }
        });
  }

  // function likeButtonLogic() {
  //   if (heartDisplayed && isDefaultButton) {
  //     return <button onClick={handleUnlike}>♥</button>;
  //   } else if (heartDisplayed && !isDefaultButton) {
  //     return <button onClick={handleLike}>♡</button>;
  //   } else if (!heartDisplayed && isDefaultButton) {
  //     return <button onClick={handleLike}>♡</button>;
  //   } else if (!heartDisplayed && !isDefaultButton) {
  //     return <button onClick={handleUnlike}>♥</button>;
  //   }
  // }

  console.log(artwork.likes);

  return (
    <>
      <img src={artwork.image} alt={artwork.title} />
      <h1>
        {artwork.title} ({artwork.year})
      </h1>
      <p>{artwork.style}</p>
      <div>
        <p>{artwork.user_artwork_likes.length} Likes</p>
        {heartDisplayed ? (
          <button onClick={handleUnlike}>♥</button>
        ) : (
          <button onClick={handleLike}>♡</button>
        )}
      </div>
    </>
  );
};

export default ArtworkCard;
