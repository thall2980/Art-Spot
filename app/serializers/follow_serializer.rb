class FollowSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :follows
  belongs_to :following
end
