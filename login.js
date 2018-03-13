var express = require('express');
app = express(),
path = __dirname + '/views/'
router = express.Router();
app.set('view engine', 'ejs');
var mongojs = require('mongojs');
var db = mongojs('mongodb://anags:software@ds235388.mlab.com:35388/login', ['first']);
var bodyParser = require('body-parser');
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.render('login.ejs');
});

app.get("/insert", function(req,res){
	var n = req.query.email
	var p = req.query.password
	var obj ={
		name : n,
		password : p,
	};
	db.first.find(obj,function (err,data){
		if(data.length>0) {
			console.log("user already there macha xP "+data.email)
			res.render('profile.ejs')
		}
		else {
			res.redirect('/')
		}
	})
})

app.get("/signup" , function (req,res){
	res.render('register.ejs')
})

app.post("/signupSubmit" , function(req,res){
	var e = req.body.email;
	var p  = req.body.password;
	var obj = {
		email : e,
		password : p,
	};
	db.first.find(obj,function(err,data){
 // .then(data =>{
 	if (data) {
    console.log("User already exists");
   }
 // })
  //.catch(err =>{
  	else{
  db.first.insert(obj, function(err,data){
    console.log("Successfully inserted");
  //  })
  })
 }
 if (err) {
 	console.log(err);
 }
})
})

app.get("/forgot",function (req,res){
	res.render('forgot.ejs')
})
app.listen(5000, function() {
    console.log('Application Running on Port ', +5000);
});