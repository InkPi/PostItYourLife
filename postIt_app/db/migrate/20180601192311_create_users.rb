class CreateUsers < ActiveRecord::Migration[5.2]
  #https://medium.com/@nick.hartunian/knock-jwt-auth-for-rails-api-create-react-app-6765192e295a
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      #t.boolean :admin, default: false

      t.timestamps
    end
  end
end
