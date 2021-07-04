class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!
  #before_action :event, only: [:show, :edit, :update, :destroy]

  def authorized?
    @event.user_id == current_user.id
  end

  def index
    allEvents = params[:user] == "self" ? Event.where({user_id: current_user.id, status: params[:status]}) : Event.where(status: params[:status])
    if params[:tags]
      allEvents = allEvents.where(tag: params[:tags])
    end
    events = allEvents.order(created_at: :desc).offset(params[:offset] ? params[:offset] : 0).limit(params[:limit])
    noOfEvents = allEvents.count
    usernames = User.select(:id, :name).order(:id)
    render json: {:event=>events, :usernames=>usernames, :noOfEvents=>noOfEvents}
  end

  def create
    event = Event.create!(event_params)
    if event
      @user = User.find(event.user_id)
      @admin = User.where(role: "admin")
      render json: event
      RequestMailer.notify(event, @user, @admin, request.base_url).deliver
    else
      render json: event.errors
    end
  end

  def approve
    event = Event.find(params[:id])
    @user = User.find(event.user_id)
    event.update_attribute(:status, "approved")

    require 'telegram/bot'
    token = '1886490695:AAGAXvPGLLH-dRzILvtbgTy-ufkZJlSgogw'
    Telegram::Bot::Client.run(token) do |bot|
      if !event.poster || event.poster == ""
        bot.api.send_message(chat_id: -1001570743148, text: "Hello! #{@user.name} has a new event for you!\n
*Name*: #{event.name}
*Venue*: #{event.venue}
*Date*: #{event.start_date.strftime("%d %B %Y")} to #{event.end_date.strftime("%d %B %Y")}
#{event.summary}

*Sign up Link*: #{event.link}
*For more details*, click [here](#{request.base_url + "/event/" + event.id.to_s})!", parse_mode:'Markdown')
      else
        bot.api.send_photo(chat_id: -1001570743148, photo: event.poster, caption: "Hello! #{@user.name} has a new event for you!\n
*Name*: #{event.name}
*Venue*: #{event.venue}
*Date*: #{event.start_date.strftime("%d %B %Y")} to #{event.end_date.strftime("%d %B %Y")}
#{event.summary}

*Sign up Link*: #{event.link}
*For more details*, click [here](#{request.base_url + "/event/" + event.id.to_s})!", parse_mode:'Markdown')
      end
    end

    event.update(event_params)
    render json: event
    RequestMailer.sendApprove(event, @user, request.base_url).deliver
  end

  def reject
    event = Event.find(params[:id])
    @user = User.find(event.user_id)
    event.update_attribute(:status, "rejected")
    event.update(event_params)
    render json: event
    RequestMailer.sendReject(event, @user, request.base_url).deliver
  end

  def show
    if event
      clone = event.attributes.except("start_date", "end_date")
      clone['start_date']=event.start_date.strftime("%d %B %Y")
      clone['end_date']=event.start_date.strftime("%d %B %Y")
      render json: {:event=>clone}
    else
      render json: event.errors
    end
  end

  def destroy
    event&.destroy
    render json: { message: 'Event deleted!'}
  end

  def event_params
    params.permit(:name, :tag, :summary, :venue, :start_date, :end_date, :details, :skills, :link, :contact, :user_id, :status, :remarks, :poster)
  end

  def event
    @event ||= Event.find(params[:id])
  end
end
