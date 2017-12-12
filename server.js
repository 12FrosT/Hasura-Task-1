var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser');
var path = require('path');
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send("Hello World - Ashish");
});

app.get('/author', function (req, res) {
	request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
	if(!error) {
		var users=JSON.parse(body);
			request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) { 
				var posts=JSON.parse(body);
				var author='';
				for(var i=0;i<users.length;i+=1){
					var count=0;
					for(var j=0;j<posts.length;j+=1){
						if(posts[j].userId==users[i].id)
							count+=1;
					}
					author+=(users[i].name+'-'+count+'<br>');
				}res.send(author);
			});
		}
		else{
			alert('something went wrong');
		}
	});
});

app.get('/setcookie',function(req, res) {
	res.cookie('firstname','ashish');
	res.cookie('age','20');
	res.send('cookie-successfully-set');
});

app.get('/getcookie',function(req, res){
	if(req.cookies.firstname==null||req.cookies.age==null){
		res.cookie('firstname','ashish');
		res.cookie('age','20');
	}
	res.send(req.cookies.firstname + "<br>" + req.cookies.age);
});

app.get('/robots.txt',function(req, res){
	res.status(403).send("Access denied");
});

app.get('/image',function(req, res){
	res.sendFile(path.join(__dirname, 'files', 'csgo.png'));
});

app.get('/input',function(req, res){
	res.sendfile(path.join(__dirname, 'files', 'input.html'))
});

app.post('/input',function(req, res){
	console.log(req.body.text);
	res.send(req.body.text);
});

app.listen(8080, function () {
  	console.log('App listening on port 8080!');
});