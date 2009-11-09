Ext.ns("users");
/**
 * @class users.Grid
 */
users.Grid = Ext.extend(Ext.grid.EditorGridPanel, {
    buttonAlign: "center",
    autoExpandColumn: 0,
 
    initComponent: function(){
        this.store = Ext.StoreMgr.get(this.storeId);
        this.columns = this.buildColumns();
        this.tbar = this.buildUI();
 
        this.viewConfig = {
            forceFit: true
        };
 
        users.Grid.superclass.initComponent.call(this);
    },
 
    buildUI : function() {
        return [{
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
    },
 
    buildColumns : function() {
        return [{
            header: "First",
            dataIndex: "first",
            editor: new Ext.form.TextField({})
        }, {
            header: "Last",
            dataIndex: "last",
            editor: new Ext.form.TextField({})
        }, {
            header: "Email",
            dataIndex: "email",
            editor: new Ext.form.TextField({})
        }];
    },
 
    onAddRecord: function(){
        var rec = new this.store.recordType({});
        this.store.insert(0, rec);
        this.startEditing(0, 0);
    },
 
    onRemoveRecord: function(){
        var index = this.getSelectionModel().getSelectedCell();
        if (!index) {
            return false;
        }
        var rec = this.store.getAt(index[0]);
        this.store.remove(rec);
    }
});
Ext.reg("users-grid", users.Grid);