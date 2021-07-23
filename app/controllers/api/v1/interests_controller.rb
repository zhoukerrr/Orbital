class Api::V1::InterestsController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user.user_role == "admin"
      interest = Interest.all.order(created_at: :desc)
      render json: interest
    else
      head(404)
    end
  end

  def my_interests
    interest = Interest.where(user_id: current_user.id).order(created_at: :desc)
    render json: interest
  end

  def my_interested_events
    interest = Interest.where(user_id: current_user.id).order(created_at: :desc)
    events = Event.where(id: interest.map {|n| n.event_id})
    organisers = events.map {|n| User.find(n.user_id).name}
    render json: {event: events, organiser: organisers}
  end

  def create #need to check if event is approved
    interest = Interest.new(interest_params)
    check = Interest.where(user_id: interest.user_id).where(event_id: interest.event_id).length()
    event = Event.find(interest.event_id)
    if interest && check == 0 && interest.user_id == current_user.id && event.status == "approved" && current_user.user_role == "student"
      interest.save
      render json: interest
    else
      render json: interest.errors
    end
  end

  def destroy 
    @interest = Interest.find(params[:id])
    if @interest.user_id != current_user.id
      head(404)
    elsif @interest.destroy
      render json: { message: 'Interest removed!' }
    else
      head(404)
    end
  end

  def attend #secure later
    @interest = Interest.find(params[:id])
    event = Event.find(@interest.event_id)
    if event.user_id == current_user.id
      if @interest.attend
        @interest.update_attribute(:attend, false)
        render json: @interest
      else
        @interest.update_attribute(:attend, true)
        render json: @interest
      end
    else
      head(404)
    end
  end

  private

  def interest_params
    params.permit(:event_id, :user_id, :attend)
  end

  def interest
    @interest ||= Interest.find(params[:id])
  end
end
