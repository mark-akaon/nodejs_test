/*global console, res, req, require, module,  __dirname*/
/*jshint node:true*/
'use strict';

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
if (process.env.NODE_ENV == 'production') { 
  console.log("Production Mode"); 
} else if (process.env.NODE_ENV == 'development') {
  console.log("Development Mode"); 
}

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.locals.pretty = true;
app.use(express.static('public_file'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'jade');
app.set('views', './views_file');
app.get('/topic/new', function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error!');
        }

        res.render('new', {topics: files});
    });
});

app.post('/topic', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/' + title, description, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error!');
        }
        res.redirect('/topic/' + title);
    });
});

app.get(['/topic', '/topic/:id'], function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            res.status(500).send('Internal Server Error!');
        }

        var id = req.params.id;
        if (id) {
            //id 값이 있을 때          
            fs.readFile('data/' + id, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            });
        } else {
            //id 값이 없을 때
            res.render('view', {topics: files, title:'Welcome', description:'Hello, JavaScript for server.'});
        }
    });
});

app.get('/', function (req, res) {
    res.send("hi!");
});

app.listen(3000, function () {
    console.log("My site is working well!!");
});