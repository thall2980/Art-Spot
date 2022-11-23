class UserCommentLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :comment_id

end
