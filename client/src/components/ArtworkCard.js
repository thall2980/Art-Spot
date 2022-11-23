import React from "react";

const ArtworkCard = ({ artwork }) => {
  return (
    <>
      <img src={artwork.image} alt={artwork.title} />
      <h1>
        {artwork.title} ({artwork.year})
      </h1>
      <p>{artwork.style}</p>
    </>
  );
};

export default ArtworkCard;
