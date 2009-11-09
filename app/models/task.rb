class Task < ActiveRecord::Base
	include ExtJS::Model
    extjs_fields :id, :user_id, :user, :title, :description
 
    belongs_to :user

end
