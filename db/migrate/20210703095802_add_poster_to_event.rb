class AddPosterToEvent < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :poster, :string
  end
end
