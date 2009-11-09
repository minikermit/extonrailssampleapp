Ext.ns("Ext.ux", "Ext.ux.FormPanel");
/**
 * @class tasks.FormPanel
 * A plugin which adds Store/Record binding methods to a FormPanel instance.
 */
Ext.ux.FormPanel.Storable = function(param) {
    Ext.apply(this, param);
}
Ext.ux.FormPanel.Storable.prototype = {
    /**
     * @cfg {String} storeId ID of Store instance to bind to panel.
     */
    storeId: undefined,
    /**
     * @cfg {String} saveButton (optional) Specifiy a dot-separted string where the left-hand-side specifies the button
     * locations [tbar|bbar|buttons] and the right-hand-side specifies the button"s itemId.
     * eg:  saveButton: "tbar.btn-save", "bbar.btn-save", "buttons.btn.save".  When the save button is located,
     * it will have an automated save-handler applied to it from Ext.ux.FormPanel.Storable.InstanceMethods#onStorableSave
     */
    saveButton: undefined,
     /**
     * @cfg {String} cancelButton (optional) Specifiy a dot-separted string where the left-hand-side specifies the button
     * locations [tbar|bbar|buttons] and the right-hand-side specifies the button"s itemId.
     * eg:  cancelButton: "tbar.btn-cancel", "bbar.btn-cancel", "buttons.btn.cancel".  When the cancel button is located,
     * it will have an automated cancel-handler applied to it from Ext.ux.FormPanel.Storable.InstanceMethods#onStorableCancel
     */
    cancelButton: undefined,
 
    init : function(panel) {
        // mixin InstanceMethods
        Ext.apply(panel, Ext.ux.FormPanel.Storable.InstanceMethods.prototype);
 
        panel.bind(Ext.StoreMgr.lookup(this.storeId));
 
        if (this.saveButton) {
            this.setHandler("save", this.saveButton, panel);
        }
        if (this.cancelButton) {
            this.setHandler("cancel", this.cancelButton, panel);
        }
 
        panel.addEvents(
            /**
             * @event storable-save
             */
            "storable-save",
            /**
             * @event storable-cancel
             */
            "storable-cancel"
        );
    },
 
    setHandler : function(action, info, panel) {
        var ids = info.split(".");
        var btn = undefined;
        if (ids[0] === "buttons") {
            for (var n = 0, len = panel.buttons.length; n < len; n++) {
                if (panel.buttons[n].itemId === ids[1]) {
                    btn = panel.buttons[n];
                    break;
                }
            }
        } else {
            var pos = (ids[0] === "tbar") ? "Top" : "Bottom";
            var toolbar = this["get" + pos + "Toolbar"]();
            btn = toolbar.getComponent(ids[1]);
        }
        if (!btn) {
            throw new Error("Ext.ux.FormPanel.Storable failed to find button " + ids[1] + " on " + ids[0]);
        }
        btn.setHandler(panel["onStorable"+ Ext.util.Format.capitalize(action)].createDelegate(panel));
    }
};
 
/**
 * @class Ext.ux.FormPanel.Storable.InstanceMethods
 * Mixin for FormPanel
 */
Ext.ux.FormPanel.Storable.InstanceMethods = function() {};
Ext.ux.FormPanel.Storable.InstanceMethods.prototype = {
 
    storableMask: undefined,
 
    /**
     * binds an Ext.data.Store to the Panel
     * @param {Ext.data.Store} store
     */
    bind : function(store) {
        // bind a Store to the form.  Fire the "form-save" event when write-actions are successful
        this.store = store;
 
        // Add store-listeners to show/hide load-mask.
        this.store.un("beforewrite", this.onStorableBeforeWrite, this);
        this.store.on("beforewrite", this.onStorableBeforeWrite, this);
 
        this.store.un("write", this.onStorableWrite, this);
        this.store.on("write", this.onStorableWrite, this);
 
    },
 
    /**
     * Loads a record.  Sets record pointer.  Sets title.
     * @param {Object} record
     */
    loadRecord: function(record) {
        this.record = record;
        this.getForm().loadRecord(record);
 
        // TODO:  Need to be able to customize title.
        this.setTitle("Edit Record");
    },
    /**
     * Resets underlying BasicForm.  Nullifies record pointer.
     */
    reset: function() {
        this.record = null;
        this.getForm().reset();
 
        // TODO:  Need to customize this.
        this.setTitle("Create Record");
    },
 
    // private
    onStorableBeforeWrite : function(proxy, action) {
        if (!this.mask) {
            this.mask = new Ext.LoadMask(this.el, {});
        }
        // quick and dirty verb present-tense inflector.
        var verb = (action[action.length-1] === "e") ? action.substr(0, action.length-1) + "ing" : action + "ing";
        this.mask.msg = verb + " record.  Please wait...";
        this.mask.show();
    },
 
    // private
    onStorableWrite : function(proxy, action) {
        this.mask.hide();
        this.fireEvent("storable-save", this);
    },
 
    // protected
    onStorableCancel : function(btn, ev) {
        this.fireEvent("storable-cancel", this, ev);
    },
 
    // protected
    onStorableSave : function(btn, ev) {
        var form = this.getForm();
        // First, validate the form...
        if (!form.isValid()) {
            Ext.Msg.alert("Error", "Form is invalid");
            return false;
        }
 
        // She"s all good.
        if (this.record === null) { // -- CREATE
            var Task = this.store.recordType;
            this.store.add(new Task(form.getValues()));
        } else {    // -- UPDDATE
            form.updateRecord(this.record);
        }
    }
};
 
Ext.preg("form-storable", Ext.ux.FormPanel.Storable);