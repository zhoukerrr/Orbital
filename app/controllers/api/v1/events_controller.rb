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
    unless current_user.user_role == 'admin'
      head(404)
    end
  end

  def index
    all_events = if current_user.user_role == 'admin'
                   Event.where(status: params[:status])
                 elsif current_user.user_role == 'organiser'
                   Event.where(status: 'approved').or(Event.where(user_id: current_user.id)).where(status: params[:status])
                 else
                   Event.where(status: 'approved').where(status: params[:status])
                 end
    # user
    all_events = if params[:user] == 'self'
                   all_events.where(user_id: current_user.id)
                 else
                   all_events.where('end_date >= ?', ::Time.zone.now.to_datetime)
                 end
    # tags
    all_events = all_events.where(tag: params[:tags]) if params[:tags]
    # search
    if params[:search]
      all_events = all_events.where('lower(name) LIKE lower(?)', "%#{params[:search]}%")
                             .or(all_events.where('lower(details) LIKE lower(?)', "%#{params[:search]}%"))
                             .or(all_events.where('lower(summary) LIKE lower(?)', "%#{params[:search]}%"))
    end
    # offset & limit
    events = all_events.order(created_at: :desc).offset(params[:offset] || 0).limit(params[:limit])
    no_of_events = all_events.count
    usernames = User.select(:id, :name).order(:id)
    render json: { event: events, usernames: usernames, noOfEvents: no_of_events }
  end

  def create 
    if (current_user.user_role != 'admin' && current_user.user_role != 'organiser') 
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
    if event.status == "submitted"
    @user = User.find(event.user_id)
    event.update_attribute(:status, 'approved')

    require 'telegram/bot'
    token = Rails.application.credentials.telegram_bot[:token]
    chat_id = Rails.application.credentials.telegram_bot[:chat_id]
    Telegram::Bot::Client.run(token) do |bot|
      if !event.poster || event.poster == ''
        bot.api.send_message(chat_id: chat_id, text: "Hello! #{@user.name} has a new event for you!\n
*Name*: #{event.name}
*Venue*: #{event.venue}
*Date*: #{event.start_date.strftime('%d %B %Y')} to #{event.end_date.strftime('%d %B %Y')}
#{event.summary}

*For more details*, click [here](#{request.base_url + '/event/' + event.id.to_s})!", parse_mode: 'Markdown')
      else
        bot.api.send_photo(chat_id: chat_id, photo: event.poster,
                           caption: "Hello! #{@user.name} has a new event for you!\n
*Name*: #{event.name}
*Venue*: #{event.venue}
*Date*: #{event.start_date.strftime('%d %B %Y')} to #{event.end_date.strftime('%d %B %Y')}
#{event.summary}

*For more details*, click [here](#{request.base_url + '/event/' + event.id.to_s})!", parse_mode: 'Markdown')
      end
    end

    event.update(event_params)
    render json: event
    RequestMailer.sendApprove(event, @user, request.base_url).deliver
    elsif event.status == "reported"
      event.update_attribute(:status, 'approved')
    end
  end

  def reject
    event = Event.find(params[:id])
    if event.status == "submitted"
      @user = User.find(event.user_id)
      event.update_attribute(:status, 'rejected')
      event.update(event_params)
      render json: event
      RequestMailer.sendReject(event, @user, request.base_url).deliver
    elsif event.status == "reported"
      event.update_attribute(:status, 'rejected')
    end
  end

  def show
    if event && (current_user.user_role == 'admin' || event.user_id == current_user.id || event.status == 'approved')
      clone = event.attributes.except('start_date', 'end_date')
      clone['start_date'] = event.start_date.to_s
      clone['end_date'] = event.end_date.to_s
      user = User.find(event.user_id)
      render json: { event: clone, organiser: user }
    else
      render json: event.errors
    end
  end

  def destroy
    event&.destroy
    render json: { message: 'Event deleted!' }
  end

  def interested_in
    if event && (current_user.id == event.user_id || current_user.user_role == 'admin')
      interests = Interest.where(event_id: event.id).order(created_at: :desc)
      interests = interests.map { |n| { student: User.find(n.user_id), attendance: n.attend, interest_id: n.id } }
      interests.sort_by! { |e| e[:student].name.downcase }
      render json: { students: interests, user: event.user_id, event_name: event.name }
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
