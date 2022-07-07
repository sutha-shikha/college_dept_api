var Services=function(app)
{
	this.bookshelf=app['bookshelf'];
	this.user = this.bookshelf.Model.extend({
		tableName : "user",
		idAttribute: "login_id"
	  });
	var user=this.user;
	

	this.course = this.bookshelf.Model.extend({
		tableName : "course",
		idAttribute: "course_id"
	  });
	var course=this.course;

	this.semester = this.bookshelf.Model.extend({
		tableName : "semester",
		idAttribute: "sem_id"
	  });
	var semester=this.semester;

	this.department = this.bookshelf.Model.extend({
		tableName : "department",
		idAttribute: "dept_id"
	  });
	var department=this.department;

	this.role = this.bookshelf.Model.extend({
		tableName : "role",
		idAttribute: "role_id"
	  });
	var role=this.role;

	this.student = this.bookshelf.Model.extend({
		tableName : "student",
		idAttribute: "stu_id",
		deptref : function(){
	        return this.belongsTo(department,'dept_id');
	 	},
		courseref : function(){
	        return this.belongsTo(course,'course_id');
	 	},
		semref : function(){
	        return this.belongsTo(semester,'sem_id');
		},
		userref : function(){
	        return this.belongsTo(user,'login_id');
		}
	});

	this.lecturer = this.bookshelf.Model.extend({
		tableName : "lecturer",
		idAttribute: "lect_id",
		deptref : function(){
	        return this.belongsTo(department,'dept_id');
	 	},
		courseref : function(){
	        return this.belongsTo(course,'course_id');
	 	},
		semref : function(){
	        return this.belongsTo(semester,'sem_id');
		},
		userref : function(){
	        return this.belongsTo(user,'login_id');
		}
	});

	this.stud = this.bookshelf.Model.extend({
		tableName : "stud",
		idAttribute: "stu_id",
		userref : function(){
	        return this.belongsTo(user,'login_id');
	 }
	});
}
Services.prototype.fetchAllUsers=function(query,table,callback)
{
	if(query==null)
	this[table].forge().fetchAll().then(function(model) {
		callback(model.toJSON());
	});
	else
		this[table].where(query).fetchAll().then(function(model) {
			callback(model.toJSON());
		});

}

Services.prototype.fetchRelated=function(query,table,callback)
{
	if(query==null)
	this[table].forge().fetchAll(
			{withRelated:['deptref', 'courseref', 'semref', 'userref']}
			).then(function(model) {
		callback(model.toJSON());
	});
	else
		this[table].where(query).fetchAll(
				{withRelated:['deptref', 'courseref', 'semref', 'userref']}
				).then(function(model) {
			callback(model.toJSON());
		});
}

Services.prototype.addData=function(reglogindata,table,callback)
{
	this[table].forge().save(reglogindata).then(function(model) {
		callback(model.toJSON());
	});
}

module.exports=Services;