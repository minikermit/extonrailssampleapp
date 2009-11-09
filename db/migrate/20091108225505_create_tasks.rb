class CreateTasks < ActiveRecord::Migration
  
  def self.up
    create_table :tasks do |t|
      t.integer :user_id, :null => false
      t.string :title, :null => false
      t.text :description, :null => false
      t.timestamps
    end
  end
 
  def self.down
    drop_table :tasks
  end

end
