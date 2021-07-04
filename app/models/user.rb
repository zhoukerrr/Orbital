class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_many :events, dependent: :destroy
  has_many :interests, dependent: :destroy

  def user_name
    name
  end

  def user_role
    role
  end

end
