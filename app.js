//Use Express framework for nodeJS
var express = require("express");

//use mongoDB
var mongo = require('mongodb');
//handlebars
var hbs = require('hbs');

//var app = express.createServer(express.logger());//deprecated
var app = express();

//middle-ware additions
app.use(express.logger());
app.use(express.static('./public'));//makes public folder as a static folder
//app.use(express.static('./files'));//may be more if required
//app.use(express.bodyParser());//must go before "router" loading
app.use(express.bodyParser({
		keepExtensions: true,
		uploadDir: './uploads'
	}));
// finally
// Explicitly add the router middleware
app.use(app.router);

//app.set('view engine','jade');//sets the view engine
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.set('views','./views');//sets path to the view files




app.get('/', function(request, response){
	//response.send('<h1>Home</h1>');
	//jade
	response.render('index',{title:'Making'});

	/*
	response.render('index', {
		title: 'Home'
	});
	*/
});

app.get('/add', function(request, response){
  response.render('add',{title:'House Keeping'});
});


app.get('/about', function(request, response){
	//response.send('About');
	var mongoUri = 'mongodb://saumyaDB:saumyaDBPW@ds049598.mongolab.com:49598/saumya-ray';
	mongo.Db.connect(mongoUri, function (err, db) {
		//response.send('Connected to DB : mongodb : driver');
		if(err){
			response.send(err);
		}else{
			var collection = db.collection('test');//get the DB selected
			var stream = collection.find().toArray(function(err, items) {
							if(err){
								response.send(err);
							}else{
								response.send(items);
							}
						});

		}
	});

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
  					//response.send('Data is put on the DB !!');
  					var stream = collection.find().toArray(function(err, items) {
  						if(err){
  							response.send(err);
  						}else{
  							response.send(items);
  						}
  					});
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

app.post('/adding', function(request, response){
  //response.render('add',{title:'House Keeping'});
  
  //response.send(request.params);
  //response.send(request.query);//GET
  //response.send(request.body);//POST : with "bodyparser" middleware enabled
  
  var fName = request.body.fname;
  var urlString = request.body.d;
  
  //response.send('<h1>Adding the data</h1>');
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
			//var doc1 = {name:'saumya',noSQL:'mongoDB',level:'rockstar'};
			var doc1 = {name:fName,url:urlString};
  			//var doc2 = {'hello':'doc2'};
  			//collection.insert(doc1);	
  			collection.insert(doc1,function(err,result){
  				if(err){
  					response.send(err);
  				}else{
  					//response.send('Data is put on the DB !!');
  					var stream = collection.find().toArray(function(err, items) {
  						if(err){
  							response.send(err);
  						}else{
  							response.send(items);
  						}
  					});
  				}
  			});
		}
	});
  //end adding
  
});





var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});