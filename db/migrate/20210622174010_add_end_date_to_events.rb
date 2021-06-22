class AddEndDateToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :end_date, :datetime, null: false
  end
end
