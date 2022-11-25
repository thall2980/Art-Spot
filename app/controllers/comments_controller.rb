class CommentsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  # GET /comments
  def index
    render json: Comment.all, status: :ok
  end

  # GET /comments/1
  def show
    render json: Comment.find(params[:id])
  end

  # POST /comments
  def create
    render json: Comment.create!(comment_params), status: :created
  end

  # PATCH/PUT /comments/1
  def update
    comment = Comment.find(params[:id])
    # if @current_user.id == comment.user_id
      comment.update!(comment_params)
      render json: comment
    # else
    #   render json: comment.errors, status: :unauthorized
    # end
  end

  # DELETE /comments/1
  def destroy
    comment = Comment.find(params[:id])
    if @current_user.id == comment.user_id
      comment.destroy
      head :no_content
    else
      render json: comment.errors, status: :unauthorized
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:artwork_id, :user_id, :text, :likes)
    end
end
