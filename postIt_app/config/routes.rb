Rails.application.routes.draw do
  #https://medium.com/@nick.hartunian/knock-jwt-auth-for-rails-api-create-react-app-6765192e295a
  scope '/api' do
    # post 'user_token' => 'user_token#create'
    post 'user_token' => 'user_token#create'
    resources :post_its
    #deleted resources user to not expose route
  end

end
