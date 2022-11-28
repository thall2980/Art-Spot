import React from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const CommentContainer = ({
  user,
  art,
  comments,
  handleAddComment,
  onDeleteComment,
  handleUpdateComment,
  handleCommentLike,
  handleCommentUnlike,
}) => {
  const filteredComments = comments.filter(
    (comment) => comment.artwork_id === art?.id
  );
  const commentCard = filteredComments.map((comment) => (
    <CommentCard
      key={comment.id}
      comment={comment}
      user={user}
      onDeleteComment={onDeleteComment}
      handleUpdateComment={handleUpdateComment}
      handleCommentLike={handleCommentLike}
      handleCommentUnlike={handleCommentUnlike}
    />
  ));

  return (
    <div>
      {commentCard}
      {user ? (
        <CommentForm className="commentForm"
          user={user}
          art={art}
          handleAddComment={handleAddComment}
        />
      ) : null}
    </div>
  );
};

export default CommentContainer;

