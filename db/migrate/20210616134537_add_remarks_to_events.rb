class AddRemarksToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :remarks, :text
  end
end
