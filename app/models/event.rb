class Event < ApplicationRecord
    validates :name, presence: true
    validates :details, presence: true
    validates :instructions, presence: true
end
