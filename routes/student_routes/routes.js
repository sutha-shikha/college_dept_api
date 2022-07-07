var Actions=require('../../actions/student_actions/actions.js');
var Routes=function(app){
	
	this.app=app;
	this.actionInst=new Actions(this.app);
	'use strict';	
}
Routes.prototype.init=function(){
	
	var actionInst=this.actionInst;
	this.app.get('/getstudent',function(req, res){
		var query;
		if (typeof req.query.stu_id != 'undefined') 
		query={stu_id:req.query.stu_id}
	actionInst.getStudent(req,query,function(result){
		res.send(result);
		
	});
	});

	this.app.get('/delstudent',function(req, res){
			var query;//=req.query.input;
			if (typeof req.query.stu_id != 'undefined') 
			query={stu_id:req.query.stu_id};
			actionInst.getPerson(req,query,function(result){
				//res.send(result);
				if(result.status == 'SUCCESS'){
					console.log("Result" +result);
					console.log(result.list[0].login_id);
					var query1={login_id:result.list[0].login_id};
					var table='student';
					actionInst.delStudent(req,query1,table,function(result1){
						//res.send(result);
						console.log("Result1" +result1);	
						var table1='user';
						actionInst.delUser(req,query1,table1,function(result2){
							console.log("Result2" +result2);
							res.send(result2);	
						});
					});
				}
				console.log("Student not available");
			});
			});

	this.app.put('/editstudent',function(req, res){
		var role = req.query.role;
		var role_id=null;
		if(role == 'student')
		{
			role_id = '3';
		}
			
		else if(role == 'lecturer')
		{
			role_id = '2';
		}
				var editData={name : req.query.name, 
					address : req.query.address,
					mobile : req.query.mobile,
					role_id :role_id,
					course_id : req.query.course_id,
					sem_id : req.query.sem_id,
					dept_id : req.query.dept_id,
					active : '1'
						   };
				var query={stu_id:req.query.stu_id};
				actionInst.getPerson(req,query,function(result){
					if(result.status=='SUCCESS')
					actionInst.editStudent(req,query,editData, function(result){
						res.send(result);
					});
					else
					res.send(result);
				});
				});

}
module.exports=Routes;
