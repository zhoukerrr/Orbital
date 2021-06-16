class AddTagToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :tag, :text, null:false
  end
end
