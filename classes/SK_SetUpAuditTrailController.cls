public class SK_SetUpAuditTrailController {
    
    @AuraEnabled
    public static completeWrapper findFilters(){
        completeWrapper returnWrapper = new completeWrapper();
        List<FilterColoumns> options= new List<FilterColoumns>();
        FilterColoumns col1=new FilterColoumns('Action','', 'Equals','text');
        options.add(col1);
        
        FilterColoumns col2=new FilterColoumns('CreatedBy.Name','', 'Equals','text');
        options.add(col2);
        
        string todaysDate = System.today().year() + '-' + System.today().month() + '-' +System.today().day();
        FilterColoumns col3=new FilterColoumns('CreatedDate','', 'Equals','date');
        options.add(col3);
        
        returnWrapper.sFilters=options;
        
        return returnWrapper;
    }
    
    public class completeWrapper{
        @AuraEnabled
        public List<FilterColoumns> sFilters{get;set;}
        @AuraEnabled
        public List<String> orderByOptions{get;set;}
        @AuraEnabled
        public string selectedOrderByField{get;set;}
        @AuraEnabled
        public string selectedOrder{get;set;}
        public completeWrapper(){
            selectedOrderByField='Action';
            selectedOrder='ASC';
            orderByOptions = new List<String>{'Action','CreatedById','CreatedDate'};
            sfilters = new List<FilterColoumns> ();
        }
    }
    public class FilterColoumns{
        @AuraEnabled
        public string selectedFilter{get;set;}
        @AuraEnabled
        public string filterValue{get;set;}
        @AuraEnabled
        public string fieldType{get;set;}
        @AuraEnabled
        public string filterSequence{get;set;}
        @AuraEnabled
        public string selectedComparator{get;set;}
        public FilterColoumns(string sFilter, string sFValue, string selectedComparator, string sfieldType){
            this.selectedFilter = sFilter;
            this.selectedComparator = selectedComparator;
            this.filterValue = sFValue;
            this.fieldType = sfieldType;
        }
    }
}