class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.belongs_to :artwork, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.text :text
      t.integer :likes

      t.timestamps
    end
  end
end
