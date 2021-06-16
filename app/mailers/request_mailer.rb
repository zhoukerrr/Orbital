class RequestMailer < ApplicationMailer

  def notify(event, user, admin)
    @event = event
    @user = user
    @admin = admin.map{|element| element.email}
    mail(to: @admin, subject: 'CCSGP new event')
  end

  def sendApprove(event, user)
    @event = event
    @user = user
    mail(to: @user.email, subject: 'Your request is Approved')
  end

  def sendReject(event, user)
    @event = event
    @user = user
    mail(to: @user.email, subject: 'Your request is Rejected')
  end
end
