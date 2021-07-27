class Api::V1::ReportsController < ApplicationController
  before_action :authenticate_user!

  def index
    #if current_user.user_role == "admin"
      report = Report.all.order(created_at: :desc)
      report = report.where(status: params[:status]) if params[:status]
      event = report.map {|n| Event.find(n.event_id).name}
      user = report.map {|n| User.find(n.user_id).name}
      render json: {report: report, event: event, user: user}
    #else
      #head(404)
    #end
  end

  def create
    report = Report.new(report_params)
    if report.user_id == current_user.id # will restrict to students only 
      report.save
      event = Event.find(report.event_id)
      event.update_attribute(:status, 'reported')
      user = User.find(report.user_id)
      admin = User.where(role: 'admin')
      RequestMailer.newReport(report, user, admin, request.base_url).deliver
      render json: report
    else
      head(404)
    end
  end

  def show
    report = Report.find(params[:id])
    event = Event.find(report.event_id)
    user = User.find(report.user_id)
    render json: {report: report, event: event, user: user}
  end

  def review
    report = Report.find(params[:id])
    if report.status == 'submitted'
      report.update_attribute(:status, 'reviewed')
    elsif report.status == 'reviewed'
      report.update_attribute(:status, 'submitted')
    end 
    render json: report
  end

  private

  def report_params
    params.permit(:event_id, :user_id, :details, :status)
  end
end
