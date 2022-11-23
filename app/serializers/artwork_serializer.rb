class ArtworkSerializer < ActiveModel::Serializer
  attributes :id, :title, :style, :year, :image
  belongs_to :user
end
