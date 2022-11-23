class CreateUserCommentLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :user_comment_likes do |t|
      t.integer :user_id
      t.integer :comment_id

      t.timestamps
    end
  end
end
