class RegistrationsController < Devise::RegistrationsController
  prepend_before_action :require_no_authentication, :only => []
  #prepend_before_action :authenticate_scope!
end