class UserCommentLikeSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :comment
end
