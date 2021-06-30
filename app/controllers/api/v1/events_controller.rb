class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!
  #before_action :event, only: [:show, :edit, :update, :destroy]

  def authorized?
    @event.user_id == current_user.id
  end

  def index
    event = Event.where(status: params[:status]).order(created_at: :desc)
    usernames = User.select(:id, :name).order(:id)
    render json: {:event=>event, :usernames=>usernames}
  end

  def self
    event = Event.where(user_id: current_user.id).where(status: params[:status]).order(created_at: :desc)
    usernames = User.select(:id, :name).order(:id)
    render json: {:event=>event, :usernames=>usernames}
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
      bot.api.send_message(chat_id: -1001570743148, text: "Hello! #{@user.name} has a new event for you!\n
*Name*: #{event.name}
*Venue*: #{event.venue}
*Date*: #{event.start_date.strftime("%d %B %Y")} to #{event.end_date.strftime("%d %B %Y")}
*Sign up Link*: #{event.link}
*For more details*, click [here](#{request.base_url + "/event/" + event.id.to_s})!", parse_mode:'Markdown')
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
      render json: {:event=>event, :start_date=>event.start_date.strftime("%d %B %Y"), :end_date=>event.end_date.strftime("%d %B %Y")}
      # render json: event
    else
      render json: event.errors
    end
  end

  def destroy
    event&.destroy
    render json: { message: 'Event deleted!'}
  end

  def event_params
    params.permit(:name, :tag, :summary, :venue, :start_date, :end_date, :details, :skills, :link, :contact, :user_id, :status, :remarks)
  end

  def event
    @event ||= Event.find(params[:id])
  end
end
