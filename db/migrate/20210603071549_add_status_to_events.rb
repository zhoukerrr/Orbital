class AddStatusToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :status, :string, default: "submitted"
  end
end
