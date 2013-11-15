Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        var now = new Date();
        var date = Rally.util.DateTime.add(now, "day", -30);
        var isoDate =  Rally.util.DateTime.toIsoString(date,true);
        console.log('date',date);
        console.log('isoDate',isoDate);
       Ext.create('Rally.data.WsapiDataStore', {
            model: 'TestCase',
            fetch: ['FormattedID','Name','WorkProduct','CreationDate'],
            pageSize: 100,
            autoLoad: true,
            filters: [
                {
                    property: 'CreationDate',
                    operator: '>',
                    value: isoDate
                }
                ],
            listeners: {
                load: this.onDataLoaded,
                scope: this
            }
        }); 
    },
    
    onDataLoaded:function(store, data){
        console.log('store.getTotalCount( ) ',store.getTotalCount( ) );
        console.log('data',data);
            Rally.data.BulkRecordUpdater.updateRecords({
                records: data,
                propertiesToUpdate: {
                    WorkProduct: '/hierarchicalrequirement/15021256041.js'  //US426
                },
                success: function(readOnlyRecords){
                },
                scope: this
            });
    }
});
