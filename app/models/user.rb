class User < ActiveRecord::Base
  
  include ExtJS::Model
  extjs_fields :id, :first, :last, :email, :updated_at, :created_at
  #OR extjs_fields :exclude => [:id]    A Bug in Ext-3.0.1 requires id as a field currently

end
