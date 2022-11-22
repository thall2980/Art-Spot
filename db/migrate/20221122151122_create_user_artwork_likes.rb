class CreateUserArtworkLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :user_artwork_likes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :artwork, null: false, foreign_key: true

      t.timestamps
    end
  end
end
