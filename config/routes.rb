Rails.application.routes.draw do
  # gets rails to serve up js files correctly
  get "/*path" => redirect("/")
end
