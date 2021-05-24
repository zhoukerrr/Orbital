Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'events/index'
      post 'events/create'
      get '/show/:id', to: 'events#show'
      delete '/destroy/:id', to: 'events#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
