# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#https://medium.com/@nick.hartunian/knock-jwt-auth-for-rails-api-create-react-app-6765192e295a
# admin = User.new
# admin.email = 'AdmonDigi@g.com'
# admin.password = 'allgr33nRuby'
# admin.password_confirmation = 'allgr33nRuby'
# admin.admin = true
# admin.save

user = User.new
user.email = 'lxz1098@yahoo.com'
user.password = '12345'
user.password_confirmation = '12345'
user.save

#users = User.create({ email:'lxz1098@yahoo.com', password: '12345', password_confirmation: '12345'})

post = PostIt.create(
  [
    {
      title: "A new cake recipe",
      content: "Made of chocolate"
    },
    {
      title: "A twitter client idea",
      content: "Only for replying to mentions and DMs"
    },
    {
      title: "A novel set in Italy",
      content: "A mafia crime drama starring Berlusconi"
    },
    {
      title: "Card game design",
      content: "Like Uno but involves drinking"
    }
  ])
