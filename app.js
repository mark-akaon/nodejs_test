/*global console, res, req, require, module,  __dirname*/
/*jshint node:true*/
'use strict';

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
if( process.env.NODE_ENV == 'production' ) { 
  console.log("Production Mode"); 
} else if( process.env.NODE_ENV == 'development' ) {
  console.log("Development Mode"); 
}

var express = require('express');
var app = express();

app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('public'));

app.get('/template', function(req, res) {
  res.render('temp', {time:Date(), title:'Jade'});
});

app.get('/route', function(req, res) {
  res.send('Hello Router, <img src="/images.jpeg">');
})

app.get('/dynamic', function(req, res) {
  var time = Date();

  var lis ='';
  for (var i=0; i< 5;i++) {
    lis = lis + '<li>coding</li>'
  }
  var output = `
  <!DOCTYPE html> 
  <html>   
    <head>
      <meta charset="utf-8"></meta>
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>`;

  res.send(output);
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});





app.get('/topic/:id', function(req, res) {
  // var output = `
  // ${req.query.id} <br/>
  // ${req.query.name} <br/>
  // `
  //res.send(output);
  var topics = [
    'javascript is ...',
    'Nodejs is ...',
    'Express is ...'
  ];

  var output = `
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id]}
  `;

  res.send(output);
  //res.send(topics[req.query.id] + " " + req.query.name);
});

app.get('/topic/:id/:mode', function(req, res) {
  res.send(req.params.id+' , ' + req.params.mode);
});

app.get('/form', function(req, res){
  res.render('form');
});

app.get('/form_receiver', function(req, res) {
  var title = req.query.title;
  var description = req.query.description;

  res.send(title + ' , ' + description);
});


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// app .use(function(req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('you poasted\n');
//   res.end(JSON.stringify(req.body, null, 2));
// });

app.post('/form_receiver', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;

  res.send(title + ' , ' + description);
});
