Rails.application.routes.draw do
  #https://medium.com/@nick.hartunian/knock-jwt-auth-for-rails-api-create-react-app-6765192e295a
  scope '/api' do
    # post 'user_token' => 'user_token#create'
    resources :post_its
    resources :users
    post 'user_token' => 'user_token#create'

  end

end
