class CreateUserCommentLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :user_comment_likes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :comment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
