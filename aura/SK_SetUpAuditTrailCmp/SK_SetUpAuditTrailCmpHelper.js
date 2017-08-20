({
	callToServer : function(component, method, callback, param) {
        var action = component.get(method);
        if(param){
            action.setParams(param);
        }
        action.setCallback(this, function(response){
         	var statusCode = response.getState();
            if(statusCode == 'SUCCESS'){
            	console.log('Succesfully recieved response from Server.')
                callback.call(this, response.getReturnValue());
            }else if(statusCode == 'ERROR'){
            	console.log('Error occurred while interacting with Server. Please try again.')   
            }
        });
        $A.enqueueAction(action);
	}
})