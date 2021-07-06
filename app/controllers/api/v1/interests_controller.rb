class Api::V1::InterestsController < ApplicationController
  before_action :authenticate_user!

  def index
    interest = Interest.all.order(created_at: :desc)
    render json: interest
  end

  def my_interests
    interest = Interest.where(user_id: current_user.id).order(created_at: :desc)
    event = Event.where(id: [1,2,3])
    render json: interest
  end

  def create
    interest = Interest.create!(interest_params)
    if interest
      render json: interest
    else
      render json: interest.errors
    end
  end

  def show
  end

  def destroy
    interest&.destroy
    render json: { message: 'Interest removed!' }
  end

  private

  def interest_params
    params.permit(:event_id, :user_id, :attend)
  end

  def interest
    @interest ||= Interest.find(params[:id])
  end
end
