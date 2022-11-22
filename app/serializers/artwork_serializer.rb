class ArtworkSerializer < ActiveModel::Serializer
  attributes :id, :title, :style, :year
  belongs_to :user
end
