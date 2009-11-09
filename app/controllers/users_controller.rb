class UsersController < ApplicationController
    include ExtJS::Controller
 
     def index
        rs = User.all.collect {|u| u.to_record}
        render(:json => {:success => true, :data => rs})
    end
 
    def create
        u = User.create(params["data"])
        render(:json => {:success => true, :data => u.to_record})
    end
 
    def update
        u = User.find(params[:id])
        render(:text => '', :status => (u.update_attributes(params["data"])) ? 204 : 500)
    end
 
    def destroy
        u = User.find(params[:id])
        render(:text => '', :status => (u.destroy) ? 204 : 500)
    end


end
