class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :event, only: [:show, :edit, :update, :destroy]

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
      RequestMailer.notify(event, @user, @admin).deliver
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
      bot.api.send_message(chat_id: -513341363, text: "Hello, a new event has been approved...\n
*Name*: #{event.name}
*Details*: #{event.details}
*Venue*: #{event.venue}
*Link*: #{event.link}
*Contact*: #{event.contact}", parse_mode:'Markdown')
    end

    render json: event
    RequestMailer.sendApprove(event, @user).deliver
  end
  helper_method :approve

  def reject
    event = Event.find(params[:id])
    @user = User.find(event.user_id)
    event.update_attribute(:status, "rejected")
    render json: event
    RequestMailer.sendReject(event, @user).deliver
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
    params.permit(:name, :tag, :summary, :venue, :details, :skills, :link, :contact, :user_id, :status)
  end

  def event
    @event ||= Event.find(params[:id])
  end
end
