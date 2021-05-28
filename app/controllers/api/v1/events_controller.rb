class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :event, only: [:show, :edit, :update, :destroy]

  def authorized?
    @event.user_id == current_user.id
  end

  def index
    event = Event.all.order(created_at: :desc)
    render json: event
  end

  def create
    event = Event.create!(event_params)
    if event
      render json: event
    else
      render json: event.errors
    end
  end

  def show
    if event
      render json: event
    else
      render json: event.errors
    end
  end

  def destroy
    event&.destroy
    render json: { message: 'Event deleted!'}
  end

  def event_params
    params.permit(:name, :summary, :venue, :details, :skills, :link, :contact, :image, :user_id)
  end

  def event
    @event ||= Event.find(params[:id])
  end
end
