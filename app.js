//Use Express framework for nodeJS
var express = require("express");

//use mongoDB
var mongo = require('mongodb');

//var app = express.createServer(express.logger());//deprecated
var app = express();

//middle-ware additions
app.use(express.logger());
app.use(express.static('./public'));//makes public folder as a static folder
//app.use(express.static('./files'));//may be more if required


app.set('view engine','jade');//sets the view engine
app.set('views','./views');//sets path to the view files

app.get('/', function(request, response){
	//response.send('<h1>Home</h1>');
	//jade
	response.render('index');

	/*
	response.render('index', {
		title: 'Home'
	});
	*/
});

app.get('/say-hello', function(request, response){
  response.render('hello');
});

app.get('/about', function(request, response){
  response.send('About');
});

app.get('/contact', function(request, response){
  response.send('Contact');
});

app.get('/mongo', function(request, response){
	//mongoDB test
	/*
	var mongoUri = 'mongodb://localhost/mydb';
	mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('mydocs', function(er, collection) {
	    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
	    });
	  });
	});
	*/
	/*
	var connect = function(callback){
		mongoose.connect('mongodb://xxx:xxx@ds037647.mongolab.com:37647/kitties-api',callback);
	}
	*/
	var mongoUri = 'mongodb://saumyaDB:saumyaDBPW@ds049598.mongolab.com:49598/saumya-ray';
	mongo.Db.connect(mongoUri, function (err, db) {
		//response.send('Connected to DB : mongodb : driver');
		if(err){
			response.send(err);
		}else{
			//response.send('Connected to DB : mongodb : driver');
			//now work with DB Server
			
			var collection = db.collection('test');//get the DB selected
			//put some data
			var doc1 = {name:'saumya',noSQL:'mongoDB',level:'rockstar'};
  			//var doc2 = {'hello':'doc2'};
  			//collection.insert(doc1);	
  			collection.insert(doc1,function(err,result){
  				if(err){
  					response.send(err);
  				}else{
  					response.send('Data is put on the DB !!');
  				}
  			});
		}
	});
	/*
	mongoose.connect(mongoUri,function(){
		response.send('Connected to DB : mongoose : driver');
	});
	*/
});





var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});