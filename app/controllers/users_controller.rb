class UsersController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create, :profile]

  # GET /users
  def index
    render json: User.all, status: :ok
  end

  # GET /users/1
  def show
    render json: User.find(params[:id]), status: :ok
  end

  # POST /users
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  # PATCH/PUT /users/1
  def update
    user = @current_user
    user.update!(user_params)
    render json: user, status: :accepted
  end

  # DELETE /users/1
  def destroy
    User.find_by_id(@current_user).destroy
    head :no_content
  end

  def profile
    render json: @current_user
  end

  private
    def user_params
      params.permit(:username, :password, :email, :first_name, :last_name, :profile_img, :bio)
    end
end
