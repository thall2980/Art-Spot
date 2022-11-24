class ArtworksController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  # GET /artworks
  def index
    render json: Artwork.all, status: :ok
  end

  # GET /artworks/1
  def show
    render json: Artwork.find(params[:id]), status: :ok
  end

  # POST /artworks
  def create
    render json: Artwork.create!(artwork_params), status: :created
  end

  def update
    artwork = Artwork.find(params[:id])
    # if @current_user.id == artwork.user_id
      artwork.update!(artwork_params)
      render json: artwork
    # else
    #   render json: artwork.errors, status: :unauthorized
    # end
  end

  # DELETE /artworks/1
  def destroy
    artwork = Artwork.find(params[:id])
    if @current_user == artwork.user_id
      artwork.destroy
      head :no_content
    else
      render json: artwork.errors, status: :unauthorized
    end
  end

  private
    def artwork_params
      params.permit(:title, :style, :year, :user_id, :likes)
    end
end
