import React from "react";

const ArtworkCard = ({ artwork, user }) => {

  // console.log(artwork.user_artwork_likes.where(user_id: user.id))


  return (
    <>
      <img src={artwork.image} alt={artwork.title} />
      <h1>
        {artwork.title} ({artwork.year})
      </h1>
      <p>{artwork.style}</p>
      <div>
        <p>{artwork.user_artwork_likes.length} Likes</p>
        {(artwork.user.id === user.id)  ? null : <button></button>}
      </div>
    </>
  );
};

export default ArtworkCard;
