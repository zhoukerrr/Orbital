class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :can_create?, only: [:create]
  before_action :can_decide?, only: [:approve, :reject]
  before_action :can_delete?, only: [:destroy, :interested_in]

  # maybe need some form of control for create and show
  def can_create?
    unless (current_user.user_role == "admin" || current_user.user_role == "organiser")
      head(404)
    end
  end

  def can_delete?
    unless (current_user.user_role == "admin" || Event.find(params[:id]).user_id == current_user.id)
      head(404)
    end
  end

  def can_decide?
    unless current_user.user_role == "admin"
      head(404)
    end
  end

  def index
    if current_user.user_role == "admin"
      all_events = Event.where(status: params[:status])
    elsif current_user.user_role == "organiser"
      all_events = Event.where(status: "approved").or(Event.where(user_id: current_user.id))
    else
      all_events = Event.where(status: "approved")
    end

    if params[:user] == 'self'
      all_events = all_events.where(user_id: current_user.id)
    else
      all_events = all_events.where(status: "approved").where("end_date >= ?", ::Time.zone.now.to_datetime)
    end
    all_events = all_events.where(tag: params[:tags]) if params[:tags]
    events = all_events.order(created_at: :desc).offset(params[:offset] || 0).limit(params[:limit])
    no_of_events = all_events.count
    usernames = User.select(:id, :name).order(:id)
    render json: { event: events, usernames: usernames, noOfEvents: no_of_events }
  end

  def create 
    if (current_user.user_role != "admin" && current_user.user_role != "organiser") 
      head(404) 
    end
    event = Event.new(event_params)
    if event.user_id == current_user.id
      event.save
      @user = User.find(event.user_id)
      @admin = User.where(role: 'admin')
      render json: event
      RequestMailer.notify(event, @user, @admin, request.base_url).deliver
    else
      render json: event.errors
    end
  end

  def approve
    event = Event.find(params[:id])
    @user = User.find(event.user_id)
    event.update_attribute(:status, 'approved')

    require 'telegram/bot'
    token = '1886490695:AAGAXvPGLLH-dRzILvtbgTy-ufkZJlSgogw'
    Telegram::Bot::Client.run(token) do |bot|
      if !event.poster || event.poster == ''
        bot.api.send_message(chat_id: -1_001_570_743_148, text: "Hello! #{@user.name} has a new event for you!\n
*Name*: #{event.name}
*Venue*: #{event.venue}
*Date*: #{event.start_date.strftime('%d %B %Y')} to #{event.end_date.strftime('%d %B %Y')}
#{event.summary}

*Sign up Link*: #{event.link}
*For more details*, click [here](#{request.base_url + '/event/' + event.id.to_s})!", parse_mode: 'Markdown')
      else
        bot.api.send_photo(chat_id: -1_001_570_743_148, photo: event.poster,
                           caption: "Hello! #{@user.name} has a new event for you!\n
*Name*: #{event.name}
*Venue*: #{event.venue}
*Date*: #{event.start_date.strftime('%d %B %Y')} to #{event.end_date.strftime('%d %B %Y')}
#{event.summary}

*Sign up Link*: #{event.link}
*For more details*, click [here](#{request.base_url + '/event/' + event.id.to_s})!", parse_mode: 'Markdown')
      end
    end

    event.update(event_params)
    render json: event
    RequestMailer.sendApprove(event, @user, request.base_url).deliver
  end

  def reject
    event = Event.find(params[:id])
    @user = User.find(event.user_id)
    event.update_attribute(:status, 'rejected')
    event.update(event_params)
    render json: event
    RequestMailer.sendReject(event, @user, request.base_url).deliver
  end

  def show
    if event && (current_user.user_role == "admin" || event.user_id == current_user.id || event.status == "approved")
      clone = event.attributes.except('start_date', 'end_date')
      clone['start_date'] = event.start_date.to_s
      clone['end_date'] = event.end_date.to_s
      user = User.find(event.user_id)
      render json: {event: clone, organiser: user}
    else
      render json: event.errors
    end
  end

  def destroy
    event&.destroy
    render json: { message: 'Event deleted!' }
  end

  def interested_in
    if event
      interests = Interest.where(event_id: event.id).order(created_at: :desc)
      students = User.where(id: interests.map {|n| n.user_id})
      render json: {students: students, user: event.user_id}
    else
      render json: event.errors
    end
  end

  def event_params
    params.permit(:name, :tag, :summary, :venue, :start_date, :end_date, :details, :skills, :link, :contact, :user_id,
                  :status, :remarks, :poster)
  end

  def event
    @event ||= Event.find(params[:id])
  end
end
