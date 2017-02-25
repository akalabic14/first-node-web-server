const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000 ;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set( 'view engine', 'hbs' );
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.listen(port);

app.use(( req, res, next ) => {
  var now = new Date().toString();
  var log  = `${now}: ${req.method} : ${req.url}`;
  fs.appendFile('server.log',log + "/n");
  next();
});

// This is being used when we need to do something
// on the server and we don't want anyone to access
// any of our pages

// app.use(( req, res, next ) => {
//   res.render('whilewait.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', ( req, res ) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
});

app.get('/about', ( req,res ) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Bad request"
  });
});
