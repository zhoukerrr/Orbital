class Api::V1::EventsController < ApplicationController
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
    params.permit(:name, :details, :image)
  end

  def event
    @event ||= Event.find(params[:id])
  end
end
