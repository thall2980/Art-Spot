class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.belongs_to :follower, null: false, foreign_key: true
      t.belongs_to :following, null: false, foreign_key: true

      t.timestamps
    end
  end
end
