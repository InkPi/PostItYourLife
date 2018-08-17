class User < ApplicationRecord
  # https://medium.com/@nick.hartunian/knock-jwt-auth-for-rails-api-create-react-app-6765192e295a
  has_secure_password
end
