var Services=require('../../services/auth/services.js');
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

Actions.prototype.addStudentLogin=function(req,regLoginData,callback)
{
	this.servicesInst.addData(regLoginData,'user',function(result)
			{
				
				if(result != null)
					status="SUCCESS";
				else
					status="FAILURE";
				
				var output={status:status,list:result};
				callback(output);
								
		});
	
}
Actions.prototype.addStudent=function(req,regData,callback)
{
	this.servicesInst.addData(regData,'student',function(result)
			{
				
				if(result != null)
					status="SUCCESS";
				else
					status="FAILURE";
				
				var output={status:status,list:result};
				callback(output);
								
		});
	
}
Actions.prototype.addLecturerLogin=function(req,regLoginData,callback)
{
	this.servicesInst.addData(regLoginData,'user',function(result)
			{
				
				if(result != null)
					status="SUCCESS";
				else
					status="FAILURE";
				
				var output={status:status,list:result};
				callback(output);
								
		});
	
}
Actions.prototype.addLecturer=function(req,regData,callback)
{
	this.servicesInst.addData(regData,'lecturer',function(result)
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