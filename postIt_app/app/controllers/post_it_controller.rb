class PostItController < ApplicationController
  def index
    render json: {
      postit: [
        {'title': 'To-Dos'},
        {'text': '-Go over rails'},
        {'text': '-Try and find nice tutorial on autherization'}
      ]
    }.to_json
  end
end
