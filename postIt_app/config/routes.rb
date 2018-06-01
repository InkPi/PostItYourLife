Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  devise_for :users
  resources :post_its
  resources :users
  # devise_for :users
  #get 'users/new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #resources :post_it
  #I think this is wrong?
  root to: "post_its#index"
end
