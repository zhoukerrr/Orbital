class AddStartDateToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :start_date, :datetime, null: false
  end
end
