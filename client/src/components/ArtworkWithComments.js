import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CommentContainer from "./CommentContainer";

const ArtworkWithComments = ({
  artwork,
  user,
  comments,
  handleArtworkLike,
  handleArtworkUnlike,
  handleAddComment,
  onDeleteComment,
  handleUpdateComment,
  handleCommentLike,
  handleCommentUnlike,
}) => {
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const art = artwork.filter((e) => String(e.id) === id)[0]; ///controls enitre component info

  const heartDisplayed = art?.user_artwork_likes.find(
    (e) => e.user_id === user.id
  );
  const findID = art?.user_artwork_likes.find((e) => e.user_id === user.id);

  function handleLike() {
    const newLike = {
      user_id: user.id,
      artwork_id: art.id,
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
  //////////////////////////////////////end of like Artwork Functions////////////////////////////////

  return (
    <div>
      <div>
        <h1>
          {art?.title} - {art?.user.username}
        </h1>
        <img src={art?.image} alt={art?.title} />
      </div>
      <div>
        <p>
          {art?.user_artwork_likes.length}{" "}
          {art?.user_artwork_likes.length === 1 ? "Like" : "Likes"}
        </p>
        {heartDisplayed ? (
          <button onClick={handleUnlike}>♥</button>
        ) : (
          <button onClick={handleLike}>♡</button>
        )}
      </div>
      <CommentContainer
        user={user}
        art={art}
        comments={comments}
        handleAddComment={handleAddComment}
        onDeleteComment={onDeleteComment}
        handleUpdateComment={handleUpdateComment}
        handleCommentLike={handleCommentLike}
        handleCommentUnlike={handleCommentUnlike}
      />
    </div>
  );
};

export default ArtworkWithComments;
