Rails.application.routes.draw do
  resources :user_artwork_likes
  resources :user_comment_likes
  resources :follows
  resources :comments
  resources :artworks
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  post "/login", to: "sessions#create"
  get "/auth", to: "users#profile"
  delete "/logout", to: "sessions#destroy"
end
