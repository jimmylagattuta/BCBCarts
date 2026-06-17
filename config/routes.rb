Rails.application.routes.draw do
  namespace :api do
    get 'turo_clicks/create'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Auth / User routes
  post "/signup", to: "api/users#create"
  get "/me", to: "api/users#show"
  post "/login", to: "api/sessions#create"
  delete "/logout", to: "api/sessions#destroy"

  # Contact form
  post "/contact", to: "api/contacts#create"

  # Turo click tracking
  post "/api/turo-clicks", to: "api/turo_clicks#create"

  # Jobs / admin utilities
  get "/pull_yelp_cache", to: "api/jobs#pull_yelp_cache"

  # React fallback route
  get "*path", to: "fallback#index", constraints: ->(req) {
    !req.xhr? && req.format.html?
  }
end