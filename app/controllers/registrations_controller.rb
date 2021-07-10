class RegistrationsController < Devise::RegistrationsController
  prepend_before_action :require_no_authentication, :only => []
  #prepend_before_action :authenticate_scope!

  def create
    if (!user_signed_in? || current_user.user_role == "admin")
      super
    else 
      head(404)
    end
  end
end