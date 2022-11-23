class UserCommentLikeSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :user
  belongs_to :comment
end
