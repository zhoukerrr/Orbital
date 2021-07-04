class CreateInterests < ActiveRecord::Migration[6.1]
  def change
    create_table :interests do |t|
      t.integer :event_id, null: false
      t.integer :user_id, null: false
      t.boolean :attend, default: false

      t.timestamps
    end
    add_index :interests, :event_id
    add_index :interests, :user_id
  end
end
