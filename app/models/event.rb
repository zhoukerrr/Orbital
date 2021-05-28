class Event < ApplicationRecord
    validates :name, presence: true
    validates :details, presence: true
    validates :summary, presence: true
    
    belongs_to :user
end
