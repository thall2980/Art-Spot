class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :likes, :artwork_id
  belongs_to :user
  has_many :user_comment_likes
end
