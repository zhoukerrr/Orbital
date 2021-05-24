class AddInstructionsToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :instructions, :text, null: false
  end
end
