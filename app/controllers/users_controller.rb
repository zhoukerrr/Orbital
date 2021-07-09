class UsersController < ApplicationController
  before_action :authenticate_user!
 
  def index
    if current_user.user_role == "admin"
      @users = User.all
    else 
      @users = User.where(role: "organiser")
    end
  end

  def show
    @user = User.find(params[:id])
    unless (current_user.user_role == "admin" || @user.role == "organiser" || @user.id == current_user.id)
      head(404)
    end
  end

  def edit
    @user = User.find(params[:id])
    unless (current_user.user_role == "admin" || @user.id == current_user.id)
      head(404)
    end
  end

  def update
    respond_to do |format|
      @user = User.find(params[:id])
      unless (@user.id == current_user.id)
        head(404)
        break
      end
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'Profile updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end

end
