class UserArtworkLikesController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create, :profile]

  # GET /user_artwork_likes
  def index
    render json: UserArtworkLike.all, status: :ok
  end

  # GET /user_artwork_likes/1
  def show
    render json: UserArtworkLike.find(params[:id]), status: :ok
  end

  # POST /user_artwork_likes
  def create
    render json: UserArtworkLike.create!(user_artwork_like_params), status: :created
  end

  # DELETE /user_artwork_likes/1
  def destroy
    userartworklike = UserArtworkLike.find(params[:id])
    if @current_user.id == userartworklike.user_id
      userartworklike.destroy
      head :no_content
    else
      render json: userartworklike.errors, status: :unauthorized
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def user_artwork_like_params
      params.permit(:user_id, :artwork_id)
    end
end
