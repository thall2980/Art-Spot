class UserCommentLikesController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  # GET /user_comment_likes
  def index
    render json: UserCommentLike.all, status: :ok
  end

  # GET /user_comment_likes/1
  def show
    render json: UserCommentLike.find(params[:id]), status: :ok
  end

  # POST /user_comment_likes
  def create
    render json: UserCommentLike.create!(user_comment_like_params), status: :created
  end

  # DELETE /user_comment_likes/1
  def destroy
    usercommentlike = UserCommentLike.find(params[:id])
    if @current_user.id == usercommentlike.user_id
      usercommentlike.destroy
      render json: usercommentlike.comment_id
    else
      render json: usercommentlike.errors, status: :unauthorized
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def user_comment_like_params
      params.permit(:user_id, :comment_id)
    end
end
