class TasksController < ApplicationController

  include Rails::ExtJS::Direct::Controller
  include ExtJS::Controller
  helper ExtJS::Helpers::Store
 
  direct_actions :create, :load, :update, :destroy
  def load
    @xresponse.result = {
      :data => Task.all.collect {|u| u.to_record}
    }
    @xresponse.status = true
    render :json => @xresponse
  end
 
  def create
    data = params["data"] || params
    t = Task.create(data)
    @xresponse.result = t.to_record
    @xresponse.status = true
    @xresponse.message = "Created Task"
    render :json => @xresponse
  end
 
  def update
    data = params["data"] || params
    t = Task.find(data["id"])
    t.update_attributes(params)
    @xresponse.status = true
    @xresponse.message = "Updated Task"
    render :json => @xresponse
  end
 
  def destroy
    t = Task.find(params["id"])
    t.destroy
    @xresponse.status = true
    @xresponse.message = "Destroyed Task"
    render :json => @xresponse
  end

end
