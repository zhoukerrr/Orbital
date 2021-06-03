class RemoveUsernameFromEvent < ActiveRecord::Migration[6.1]
  def change
    remove_column :events, :username, :string
  end
end
