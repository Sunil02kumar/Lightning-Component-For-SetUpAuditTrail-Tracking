({
	doInit : function(component,event,helper){
       console.log('doInit of SK_GenericDataTable component called');
       helper.callToServer(
            component,
            "c.getAllRelatedRecords",
            function(response) {
                if(response == 'MALFORMED SOQL STRING'){
                    alert('Some problem with object configuration in custom setting for this object. Please contact your system administrator,');
                }else{
                	var tableData = response;
                    
                	tableData =tableData .replace(/(&quot\;)/g,"\"")
                    tableData  = tableData .replace(/(&lt\;)/g,'<').replace(/(&gt\;)/g,'>').replace(/(&#39\;)/g,'\'').replace(/(&amp\;)/g,'&');
                    var jsonData = JSON.parse(tableData)
                    //console.log('****JSON response in datatable:'+JSON.stringify(jsonData));
                    //rendering jquery datatable new
                    setTimeout(function(){ 
                        var tableHeaders="";
                        $.each(jsonData.columns, function(i, val){
                            tableHeaders += "<th>" + val + "</th>";
                        });
                        $("#tableDiv").empty();   
                        $("#tableDiv").append('<table id="displayTable" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
                        $("#displayTable").dataTable(jsonData);
                    }, 100);     
                } 
               
            }, 
            {
            	objAPIname: component.get('v.objAPIname'),
            	FieldsAPINameList: component.get('v.fieldsAPINameList'),
            	columnLabelsList: component.get('v.columnsLabelList'), 
                sortColumns: component.get('v.sortingOrder'),
                filterCriteria: component.get('v.filterCriteria'),
                hyperLinkFieldName:component.get('v.linkField'),
            	recordsLimit: component.get('v.recordsLimit')
                
            }
        ); 
    },
    showSpinner: function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
    hideSpinner: function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.addClass(spinner, "slds-hide");
    }
})