class ApplicationController < ActionController::API
  # https://github.com/nsarno/knock
  include Knock::Authenticable
end
