class Comment < ApplicationRecord
  belongs_to :artwork
  belongs_to :user
  has_many :user_comment_likes, dependent: :destroy

  validates :text, length: {maximum: 500}
  validates :likes, numericality: true
end
