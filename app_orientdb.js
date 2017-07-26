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
var orientDB = require('orientjs');

var server = orientDB(
    {
        host: 'localhost',
        port:2424,
        username:'root',
        password: 'ilvmad99'
    }
);
var db = server.use('o2'); 

app.locals.pretty = true;
app.use(express.static('public_file'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'jade');
app.set('views', './views_orientdb');

app.get('/topic/add', function (req, res) {
    var sql = 'SELECT * FROM topic';
    db.query(sql).then(function (topics) {
        if (topics.length === 0) {
            console.log('There is no topic record');
            res.status(500).send('Internal Server Error!');
        }
        res.render('add', {topics: topics});
    });
});

app.post('/topic/add', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.autor;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(:title, :desc, :author)';
    db.query(sql, {params: {title: title, desc: description, author: author}}).then(function (results) {
        res.send(results);
    });
    // fs.writeFile('data/' + title, description, function (err) {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('Internal Server Error!');
    //     }
    //     res.redirect('/topic/' + title);
    // });
});


app.get(['/topic', '/topic/:id'], function (req, res) {
    var sql = 'SELECT * FROM topic';
    db.query(sql).then(function (topics) {
        var id = req.params.id;
        if (id) {
            var sql1 = 'SELECT FROM topic WHERE @rid=:rid';
            db.query(sql1, {params: {rid: id}}).then(function (topic) {
                console.log(topic[0]);
                res.render('view', {topics: topics, topic: topic[0]});
            });
        } else {
            res.render('view', {topics: topics});
        }
    });
});

app.get('/', function (req, res) {
    res.send("hi!");
});

app.listen(3000, function () {
    console.log("My site is working well!!");
});