class ArtworkSerializer < ActiveModel::Serializer
  attributes :id, :title, :style, :year, :image, :likes
  belongs_to :user
  has_many :user_artwork_likes
end
