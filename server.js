const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set( 'view engine', 'hbs' );
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use(( req, res, next ) => {
  var now = new Date().toString();
  var log  = `${now}: ${req.method} : ${req.url}`;
  fs.appendFile('server.log',log + '/n');
  next();
});

app.use(( req, res, next ) => {
  res.render('whilewait.hbs');
})

app.listen(3000);

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