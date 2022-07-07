var Actions=require('../../actions/auth/actions.js');
var Routes=function(app){
	
	this.app=app;
	this.actionInst=new Actions(this.app);
	'use strict';	
}
Routes.prototype.init=function(){
	
	var actionInst=this.actionInst;

	this.app.get('/getuser',function(req, res){
		var query;
		if (typeof req.query.login_id != 'undefined') 
		query={login_id:req.query.login_id};
		actionInst.getUser(req,query,function(result){
			res.send(result);
		});
		});

	this.app.get('/authenticate',function(req, res){
			var query;
			if (typeof req.query.login != 'undefined' && typeof req.query.password != 'undefined' && typeof req.query.role != 'undefined') 
			{
				var encrypted_pwd = Buffer.from(req.query.password).toString('base64');	
				query={login_id:req.query.login};
						actionInst.getUser(req,query,function(result){
							query1 = {login_id:result.list[0].login_id};
							if(encrypted_pwd == result.list[0].password)
							{
								if(req.query.role == 'student')
								{
									actionInst.getStudent(req,query1,function(result1){
										res.send(result1);
										
									});
								}
								else if(req.query.role == 'lecturer'){
									actionInst.getLecturer(req,query1,function(result1){
										res.send(result1);
										
									});
								}
								
							}
							else{
								return res.status(400).send({
									message: 'Check your login password'
								 });
								 
							}
						});
			}

			});

	this.app.post('/register',function(req, res){
		var role = req.query.role;
		var encrypted_pwd = Buffer.from(req.query.password).toString('base64');
		console.log(encrypted_pwd);
		var role_id=null;
		if(role == 'student')
		{
			role_id = '3';
		}
			
		else if(role == 'lecturer')
		{
			role_id = '2';
		}
			
		else 
			console.log("pls provide a proper role");
		var regData={name : req.query.name, 
					address : req.query.address,
					mobile : req.query.mobile,
					role_id :role_id,
					login_id : req.query.login,
					course_id : req.query.course_id,
					sem_id : req.query.sem_id,
					dept_id : req.query.dept_id,
					active : '1'
						   };
		var regLoginData={
			login_id : req.query.login,
			password : encrypted_pwd,
			active : '1'
		}
			
		if(req.query.role== "student"){
			actionInst.addStudentLogin(req,regLoginData,function(result){
				actionInst.addStudent(req,regData,function(result1){
					console.log(result);
					console.log(result1);
					res.send(result1);
					
			});
		});
		}
		else if(req.query.role== "lecturer"){
			actionInst.addLecturerLogin(req,regLoginData,function(result){
				actionInst.addLecturer(req,regData,function(result1){
					res.send(result1);
			});
		});
		}
		else
			console.log("Error on registration. Pls provide proper informations");
			
		});
	
}
module.exports=Routes;
