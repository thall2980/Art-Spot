class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :following_id
  belongs_to :following

end
