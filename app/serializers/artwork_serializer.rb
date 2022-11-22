class ArtworkSerializer < ActiveModel::Serializer
  attributes :id, :title, :style, :year, :likes
  belongs_to :user
end
