class FollowsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

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
    render json: Follow.create!(follow_params), status: :created
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
      params.permit(:follower_id, :following_id)
    end
end
