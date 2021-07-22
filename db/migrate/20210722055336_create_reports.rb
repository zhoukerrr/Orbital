class CreateReports < ActiveRecord::Migration[6.1]
  def change
    create_table :reports do |t|
      t.integer :event_id, null: false
      t.integer :user_id, null: false
      t.text :details, null: false
      t.string :status, default: "submitted"

      t.timestamps
    end
  end
end
