class ProjectsController < ApplicationController
  
  include ExtJS::Controller
  include Rails::ExtJS::Direct::Controller
  helper ExtJS::Helpers::Store
  helper ExtJS::Helpers::Component

end
