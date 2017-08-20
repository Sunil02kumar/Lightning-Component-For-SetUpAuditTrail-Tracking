({
	doInit : function(component, event, helper) {
		helper.callToServer(
            component,
            "c.findFilters",
            function(response){
                console.log('response from apex:'+response.length);  
                component.set("v.ltngFilters",response);
                component.set("v.ltngFilter",response[0]);
            },
            {}
        );
        //displaying last 9000 setup Audit trail records
        $A.createComponent(
            "c:SK_GenericDataTableCmp", {
                "objAPIname" : "SetUpAuditTrail", 
            	"fieldsAPINameList" : "['Action','Display','Section','CreatedDate','CreatedBy.Name']",
            	"columnsLabelList" : "['Action','Display','Section','CreatedDate','CreatedBy']",
                "sortingOrder":"CreatedDate DESC"
            },
            function(msgBox) {
                //Add the pop up screen to body
                if (component.isValid()) {
                    console.log('****creating the datatable again');
                    var targetCmp = component.find('dataTableSection');
                    var body = targetCmp.get("v.body");
                    body.push(msgBox);
                    targetCmp.set("v.body", body);
            	}
            }
        );
	},
    handleClick : function(component,event,helper){
        console.log('******handleClick is called');
        component.set("v.ltngDisplayAddFilterButton","false");
        
        var currentFilters=component.get("v.ltngFilters");
        var opt= component.get("v.ltngFilter");
        opt.filterSequence = currentFilters.length + 1;
        opt.selectedFilter='CreatedById';
        currentFilters.push(opt);
        component.set("v.ltngFilters",currentFilters);
        console.log('******updated currentFilters:'+JSON.stringify(currentFilters));
        if(currentFilters.length==3){
            component.set("v.ltngDisplayAddFilterButton","true");
        }
    },
    submitFilters: function(component,event,helper){
        var userFilters=component.get("v.ltngFilters");
        var userSelectedFilters = userFilters.sFilters;
        console.log('*******userSelectedFilters:'+JSON.stringify(userSelectedFilters));
        var filterString='';
        for(var i=0;i<userSelectedFilters.length;i++){
            var eachFilter = userSelectedFilters[i];
            
            if(eachFilter.filterValue){
                var scomparator='';
                var fValue = eachFilter.filterValue;
                var temp = '';
                if(eachFilter.fieldType == 'date'){
                    fValue = ' '+ fValue + 'T00:00:00.000Z';
                    
                }else{
                    fValue = ' \'' + fValue + '\'';
                }
                if(eachFilter.selectedComparator == 'Equals'){
                    temp = eachFilter.selectedFilter + ' = ' + fValue + ' ';
                	  
                }else if(eachFilter.selectedComparator == 'Not Equals'){
                	temp = eachFilter.selectedFilter + ' != ' + fValue + ' ';
                }else if(eachFilter.selectedComparator == 'Less Than'){
                	temp = eachFilter.selectedFilter + ' < ' + fValue + ' ';
                }else if(eachFilter.selectedComparator == 'Greater Then'){
                	temp = eachFilter.selectedFilter + ' > ' + fValue + ' ';
                }else if(eachFilter.selectedComparator == 'Contains'){
                	temp = eachFilter.selectedFilter + ' Like \'%' + eachFilter.filterValue + '%\' ' ; 
                }
                
                filterString = filterString + ' ' + temp + ' AND';
            }
        }
        if(filterString.endsWith('AND')){
            filterString = filterString.slice(0, -3);
            console.log('*********');
        }
        console.log('******filterString'+filterString);
        var cmp = component.find('dataTableSection');
        cmp.set("v.body",[]);
        console.log('****destroying datatable');
        
        $A.createComponent(
            "c:SK_GenericDataTableCmp", {
                "objAPIname" : "SetUpAuditTrail", 
            	"fieldsAPINameList" : "['Action','Display','Section','CreatedDate','CreatedBy.Name']",
            	"columnsLabelList" : "['Action','Display','Section','CreatedDate','CreatedBy']",
                "filterCriteria" : filterString,
                "sortingOrder":""
            },
            function(msgBox) {
                //Add the pop up screen to body
                if (component.isValid()) {
                    console.log('****creating the datatable again');
                    var targetCmp = component.find('dataTableSection');
                    var body = targetCmp.get("v.body");
                    body.push(msgBox);
                    targetCmp.set("v.body", body);
            	}
            }
        );
    }
})