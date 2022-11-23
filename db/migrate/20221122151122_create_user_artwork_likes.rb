class CreateUserArtworkLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :user_artwork_likes do |t|
      t.integer :user_id
      t.integer :artwork_id

      t.timestamps
    end
  end
end
