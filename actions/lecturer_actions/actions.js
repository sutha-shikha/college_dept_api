var Services=require('../../services/lecturer_services/services.js');
var Actions=function(app)
{
	this.app=app;
	this.servicesInst=new Services(this.app);
	
}

Actions.prototype.getLecturer=function(req,query,callback)
{
	var status,list={};
	this.servicesInst.fetchRelated(query,'lecturer', function(result)
	{
		if(result.length > 0)
			status="SUCCESS";
		else
			status="FAILURE";
		var output={status:status,list:result};
		callback(output);					
	});
	
}

module.exports=Actions;