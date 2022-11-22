class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text
  belongs_to :artwork
  belongs_to :user
end
