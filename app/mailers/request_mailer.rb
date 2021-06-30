class RequestMailer < ApplicationMailer

  def notify(event, user, admin, link)
    @event = event
    @user = user
    @admin = admin.map{|element| element.email}
    @link = link
    mail(to: @admin, subject: 'CCSGP new event')
  end

  def sendApprove(event, user, link)
    @event = event
    @user = user
    @link = link
    mail(to: @user.email, subject: 'Your request is Approved')
  end

  def sendReject(event, user, link)
    @event = event
    @user = user
    @link = link
    mail(to: @user.email, subject: 'Your request is Rejected')
  end
end
