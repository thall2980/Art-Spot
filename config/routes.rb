Rails.application.routes.draw do
  resources :follows
  resources :comments
  resources :artworks
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  post "/login", to: "sessions#create"
  get "/me", to: "users#profile"
  delete "/logout", to: "sessions#destroy"
end
