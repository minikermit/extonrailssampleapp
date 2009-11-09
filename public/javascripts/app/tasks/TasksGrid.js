Ext.ns("tasks");
tasks.Grid = Ext.extend(Ext.grid.GridPanel, {
    autoExpandColumn: 1,
    initComponent: function(){
        this.store = Ext.StoreMgr.get(this.storeId);
        this.columns = [{
            header: "Title",
            dataIndex: "title",
            editor: new Ext.form.TextField({})
        }, {
            header: "Description",
            dataIndex: "description",
            editor: new Ext.form.TextField({})
        }, {
            header: "User",
            dataIndex: "user",
            renderer: function(user) {  // --- custom-renderer for belongs_to :user
                return user.first + " " + user.last;
            }
        }];
        this.tbar = [{
            text: "Add",
            iconCls: "silk-add",
            handler: this.onAddRecord,
            scope: this
        }, "-", {
            text: "Remove",
            iconCls: "silk-delete",
            handler: this.onRemoveRecord,
            scope: this
        }, "-"];
 
        this.viewConfig = {
            forceFit: true
        };
 
        this.addEvents("add-record");
 
        tasks.Grid.superclass.initComponent.call(this);
    },
 
    onAddRecord: function(){
        this.fireEvent("add-record", this);
    },
 
    onRemoveRecord: function(){
        var record = this.getSelectionModel().getSelected();
        this.store.remove(record);
    }
});
Ext.reg("tasks-grid", tasks.Grid);