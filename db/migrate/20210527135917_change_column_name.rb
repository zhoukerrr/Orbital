class ChangeColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :events, :instructions, :summary
  end
end
