const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var ENV=process.env.ENV?process.env.ENV:'dev';
var conf=require('./conf/'+ENV+'.js');
const mysql = require('mysql');
var Routes=require('./routes/lecturer_routes/routes.js');
var Routes1=require('./routes/student_routes/routes.js');
var Routes2=require('./routes/auth/routes.js');
app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); 
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });
app.listen(conf.api.port, function () { console.log(conf.api.port)});
app.use(bodyParser.json());

var knex = require('knex')({
    client: conf.database.client,
    connection: {
        host     : conf.database.host,
        user     : conf.database.user,
        password : conf.database.password,
        database : conf.database.schema
    }
});

var Bookshelf = require('bookshelf')(knex);
app['bookshelf']=Bookshelf;
var routesInst=new Routes(app);
var routesInst1=new Routes1(app);
var routesInst2=new Routes2(app);
routesInst.init();
routesInst1.init();
routesInst2.init();