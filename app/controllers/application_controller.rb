class ApplicationController < ActionController::Base
    before_action :configure_permitted_params, if: :devise_controller?

    protected
    def configure_permitted_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :role])
    end

    def after_sign_in_path_for(resource)
        session[:return_to] ||= request.referer
    end
end
