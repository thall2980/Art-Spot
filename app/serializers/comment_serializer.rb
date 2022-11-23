class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :likes
  belongs_to :artwork
  belongs_to :user
end
