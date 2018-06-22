const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port  = process.env.PORT || 3000;
var app = express();
//(key, value)
app.set('view engine' , 'hbs');

hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
  var now  = new Date().toString();
  var log = `${now} :${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log' , log + '\n'  , (err) =>{
    console.log('Unable to append to server.log');
  });
  next();
})

app.use((req, res, next) => {
  res.render('maintainance.hbs');
})

//middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear' , () =>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt' , (text)=>{
  return text.toUpperCase();
})
//setup http route handler for http
//(url, function what to send back)
//'/' for root of the application
app.get('/' , (req , res) => {
  //res.send('<h1>Hello Express!</h1>');
res.render('home.hbs' , {
  pageTitle: 'Home Page',
  welcomeMessage : 'Welcome to my website'
})
});

app.get('/about' , (req, res) =>{
  // res.send('ABOUT PAGE.');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});
// /bad -send back json with errorMessage

app.get('/bad' , (req, res) => {
  res.send({
   status: '404',
   description: 'Not found'
  })
});

//app will not listen until we add the line below
app.listen(port ,() =>{
  console.log(`Server is up on the port ${port}`);
});
