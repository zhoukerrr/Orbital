class RemoveImageFromEvents < ActiveRecord::Migration[6.1]
  def change
    remove_column :events, :image, :string
  end
end
