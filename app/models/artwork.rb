class Artwork < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :user_artwork_likes, dependent: :destroy

  validates_presence_of :title, :style, :year, :image
  validates :year, numericality: true
  validates :likes, numericality: true
end
