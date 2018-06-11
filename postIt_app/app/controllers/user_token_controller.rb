class UserTokenController < Knock::AuthTokenController
  # https://github.com/nsarno/knock/issues/208
  skip_before_action :verify_authenticity_token
end
