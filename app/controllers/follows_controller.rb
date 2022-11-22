class FollowsController < ApplicationController
  before_action :set_follow, only: %i[ show update destroy ]

  # GET /follows
  def index
    render json: Follow.all, status: :ok
  end

  # GET /follows/1
  def show
    render json: Follow.find(params[:id])
  end

  # POST /follows
  def create
    render json: Follow.create!(artwork_params), status: :created
  end

  # DELETE /follows/1
  def destroy
    follow = Follow.find(params[:id])
    if @current_user == follow.follower
      follow.destroy
      head :no_content
    else
      render json: artwork.errors, status: :unauthorized
    end
  end

  private

    # Only allow a list of trusted parameters through.
    def follow_params
      params.permit(:follower, :following)
    end
end
