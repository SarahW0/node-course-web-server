const express =  require('express');
const hbs =require('hbs');
const fs = require('fs');

var path    = require("path");

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var content = 'Time: '+ now + '\n';
  content += 'Request is from: '+ req.ip + '\n';

  fs.appendFile('server.log',content, (error) =>{
    console.log(error);
  });
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public/'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/', (req,res) => {
/*  res.send({
    name: 'Sarah',
    age: 40,
    job: 'IT programmer'
  });*/
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req,res) => {
  //res.send('<h1>About page</h1>');
  res.render('about.hbs',{pageTitle:'About Page'});
});
app.get('/help', (req,res) => {
//  res.sendFile(path.join(__dirname+'/public/help.html'));
  res.render('about.hbs',{pageTitle:'Help Page'});
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to process the request'
  });
});

app.listen(3000);
