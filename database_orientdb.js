/*global console, res, req, require, module,  __dirname*/
/*jshint node:true*/
'use strict';

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
if (process.env.NODE_ENV == 'production') { 
  console.log("Production Mode"); 
} else if (process.env.NODE_ENV == 'development') {
  console.log("Development Mode"); 
}

var orientDB = require('orientjs');

var server = orientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'ilvmad99'
});

var db = server.use('o2');
console.log('Using database : ' + db.name);

// db.record.get('#15:0').then(function (record) {
//   console.log('Loaded record: ', record);
// });

/*
 * CREATE
 * READ
 * UPDATE
 * DELETE 
 * 
 * CRUD
 */

// CREATE
// var sql = 'SELECT * FROM topic';
// db.query(sql).then(function (results) {
//   console.log(results);

//   //db.close();
// });

// var sql1 = 'SELECT * FROM topic WHERE @rid=:rid';
// var param = {
//   params: {
//     rid: '#15:0'
//   }
// };

// db.query(sql1, param).then(function (results) {
//   console.log(results);

//   //db.close();
// });
var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
var param ={
  params: {
    title: 'Express',
    desc: 'Express is a framework for web'
  }
};
db.query(sql, param).then(function (results) { console.log(results);});

// var sql = "UPDATE topic SET title=:title, description=:desc WHERE @rid=:rid";
// db.query(sql, {params: {title: 'Expressjs', desc: 'Express is a nodejs middleware framework for web', rid: '#15:1'}}).then(function (results) {
//   console.log(results);
// });


// var sql = "DELETE FROM topic WHERE @rid=:rid";
// db.query(sql, {params: {rid: '#15:1'}}).then(function (results) {console.log(results) });

// close db
//db.close();
