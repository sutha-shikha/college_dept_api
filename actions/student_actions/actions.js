var Services=require('../../services/student_services/services.js');
var Actions=function(app)
{
	this.app=app;
	this.servicesInst=new Services(this.app);
	
}
Actions.prototype.getStudent=function(req,query,callback)
{
	var status,list={};
	this.servicesInst.fetchRelated(query,'student', function(result)
	{
		if(result.length > 0)
			status="SUCCESS";
		else
			status="FAILURE";
		var output={status:status,list:result};
		callback(output);					
	});
	
}
Actions.prototype.getPerson=function(req,query,callback)
{
	var status,list={};
	this.servicesInst.fetchAllUser(query,'student', function(result)
	{
		if(result.length > 0)
			status="SUCCESS";
		else
			status="FAILURE";
		var output={status:status,list:result};
		callback(output);					
	});
	
}

Actions.prototype.getUser=function(req,query,callback)
{
	var status,list={};
	this.servicesInst.fetchAllUsers(query,'user', function(result)
			{
				
				if(result.length > 0)
					status="SUCCESS";
				else
					status="FAILURE";
				
				var output={status:status,list:result};
				callback(output);
								
		});
	
}

Actions.prototype.delStudent=function(req,query,table,callback)
		{
			var status,list={};
			this.servicesInst.delRow(query,'student', function(result)
			{
				if(result != null)
				status="SUCCESS";
			else
				status="FAILURE";
			
			var output={status:status,list:result};
			callback(output);
								
		});
	
}
Actions.prototype.delUser=function(req,query,table,callback)
		{
			var status,list={};
			this.servicesInst.delRow(query,'user', function(result)
			{
				if(result != null)
				status="SUCCESS";
			else
				status="FAILURE";
			
			var output={status:status,list:result};
			callback(output);
								
		});
	
}
Actions.prototype.editStudent=function(req,query,data, callback)
{
	this.servicesInst.editData(query,data,'student', function(result)
	{
				
				if(result != null)
					status="SUCCESS";
				else
					status="FAILURE";
				var output={status:status,list:result};
				callback(output);
								
		});
	
}
module.exports=Actions;