class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :email, :first_name, :last_name, :profile_img, :bio

  has_many :artworks
  has_many :user_artwork_likes
end
