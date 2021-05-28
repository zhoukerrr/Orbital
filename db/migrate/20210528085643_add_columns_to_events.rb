class AddColumnsToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :venue, :string, null: false
    add_column :events, :skills, :text, null: false
    add_column :events, :link, :string, null: false
    add_column :events, :contact, :text, null: false
  end
end
