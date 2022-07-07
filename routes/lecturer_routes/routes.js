var Actions=require('../../actions/lecturer_actions/actions.js');
var Routes=function(app){
	
	this.app=app;
	this.actionInst=new Actions(this.app);
	'use strict';	
}
Routes.prototype.init=function(){
	
	var actionInst=this.actionInst;
	
	this.app.get('/getlecturer',function(req, res){
		var query;
		if (typeof req.query.lect_id != 'undefined') 
		query={lect_id:req.query.lect_id}
	actionInst.getLecturer(req,query,function(result){
		res.send(result);
		
	});
	});
}
module.exports=Routes;
