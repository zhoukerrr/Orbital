class ApplicationController < ActionController::Base
    before_action :configure_permitted_params, if: :devise_controller?

    protected
    def configure_permitted_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :role])
    end

    def after_sign_in_path_for(resource)
        if request.referer == request.base_url + "/users/sign_in"
            session[:return_to] ||= request.base_url
        else 
            session[:return_to] ||= request.referer
        end
    end

    rescue_from ActionController::InvalidAuthenticityToken do |exception|
        sign_out # Example method that will destroy the user cookies
    end

end
