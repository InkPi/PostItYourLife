class PostItsController < ApplicationController
  before_action :authenticate_user
  before_action :set_post_its, only: [:show, :update, :destroy]

  # GET /post_its
  def index
    @post_its = PostIt.all

    render json: @post_its
  end

  # GET /post_its/1
  def show
    render json: @post_it
  end

  # POST /post_its
  def create
    @post_it = PostIt.new(post_it_params)

    if @post_it.save
      render json: @post_it, status: :created, location: @post_it
    else
      render json: @post_it.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /post_its/1
  def update
    if @post_it.update(post_it_params)
      render json: @post_it
    else
      render json: @post_it.errors, status: :unprocessable_entity
    end
  end

  # DELETE /post_its/1
  def destroy
    @post_it.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post_it
      @post_it = PostIt.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_it_params
      params.require(:post_it).permit(:title, :content)
    end
end
