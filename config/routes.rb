Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'reports/index'
      post 'reports/create'
      get 'report/show/:id', to: 'reports#show'
      #delete '/destroy/:id', to: 'reports#destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'interests/index'
      post 'interests/create'
      delete 'interests/destroy/:id', to: 'interests#destroy'
      get 'interests/my_interests'
      get 'interests/my_interested_events'
      patch '/attend/:id', to: 'interests#attend'
    end
  end
  get 'homepage/about'
  devise_for :users, :controllers => { :registrations => 'registrations'}
  resources :users, only: [:index, :show, :edit, :update, :destroy]
  
  namespace :api do
    namespace :v1 do
      get 'events', to: 'events#index'
      get 'events/self'
      post 'events/create'
      get '/show/:id', to: 'events#show'
      delete '/destroy/:id', to: 'events#destroy'
      patch '/approve/:id', to: 'events#approve'
      patch '/reject/:id', to: 'events#reject'
      get '/interested_in/:id', to: 'events#interested_in'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
