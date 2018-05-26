Rails.application.routes.draw do
  resources :post_its
  devise_for :users
  get 'users/new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :post_it
end
