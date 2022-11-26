class User < ApplicationRecord
    has_many :artworks, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :followers, dependent: :destroy
    has_many :following, dependent: :destroy
    has_many :user_artwork_likes, dependent: :destroy
    has_many :user_comment_likes, dependent: :destroy

    
  # Allows association to view list of users who follow a given user i.e. user.followers
  has_many :follower_relationships, foreign_key: :following_id, class_name: 'Follow'
  has_many :followers, through: :follower_relationships, source: :follower

  # Allows association to view list of users who follow a given user i.e. user.following
  has_many :following_relationships, foreign_key: :follower_id, class_name: 'Follow'
  has_many :following, through: :following_relationships, source: :following

  validates_presence_of :username, :email, :first_name, :last_name, :profile_img
  validates_uniqueness_of :username, :email, on: :create
  # validates :email, uniqueness: true, on: :create
  # validates :username, uniqueness: true, on: :create
  validates :password, presence: true, length: { minimum: 6, maximum: 16 }, if: :password_digest_changed?
  validates :username, length: { minimum: 3, maximum: 16 }
  validates :email, length: { minimum: 6, maximum: 25 }
  validates :first_name, length: {maximum: 20}
  validates :last_name, length: {maximum: 20}
  validates :bio, length: {maximum: 500}

  has_secure_password

end
