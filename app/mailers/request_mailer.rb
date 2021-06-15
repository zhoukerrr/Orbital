class RequestMailer < ApplicationMailer

  def notify(event, user, admin)
    @event = event
    @user = user
    @admin = admin.map{|element| element.email}
    mail(to: @admin, subject: 'CCSGP new event')
  end
end
