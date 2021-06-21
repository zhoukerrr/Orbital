Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index, :show, :edit, :update]
  
  namespace :api do
    namespace :v1 do
      get 'events', to: 'events#index'
      get 'events/self'
      post 'events/create'
      get '/show/:id', to: 'events#show'
      delete '/destroy/:id', to: 'events#destroy'
      patch '/approve/:id', to: 'events#approve'
      patch '/reject/:id', to: 'events#reject'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
