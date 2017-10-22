const express = require('express');
var bodyParser = require('body-parser');
var api = express.Router();
const fileUpload = require('express-fileupload');
const client = require('mongodb').MongoClient;

api.use(fileUpload());
api.use(bodyParser.urlencoded({
  extended: true
}));
api.use(bodyParser.json());

var url = 'mongodb://localhost:27017/saturnsDB';
var db = null;

client.connect(url, (err, database) => {
  if (!err) {
    console.log('connected to database');
    db = database;
  }
});

api.get('/users', (req, res) => {
  db.collection('users')
    .find({})
    .toArray((err, users) => {
      if (!err) {
        res.json({
          mensaje: 'ok',
          users: users
        });
      } else {
        res.json({
          mensaje: 'could not load all users or there is no any user'
        });
      }
    })
});

api.post('/login', (req, res) => {
  db.collection('users').find({
    user: req.body.user,
    pass: req.body.pass
  }).toArray((err, user) => {
    if (err || user.length == 0) {
      res.json({
        mensaje: 'information given does not match or user already exist'
      });
    } else {
      res.json({
        mensaje: 'loged',
        user: user[0]
      });
    }
  })
});

api.post('/register', (req, res) => {
  db.collection('users').find({
    user: req.body.email
  }).toArray((err, users) => {
    if (!err && users.length == 0) {
      var newUser = {
        name: req.body.name,
        subName: req.body.subName,
        user: req.body.user,
        pass: req.body.pass,
        email: req.body.email,
        pais: req.body.pais,
        img: '',
      };
      db.collection('users').insert(newUser, (errInsert) => {
        if (!errInsert) {
          res.json({
            mensaje: 'registered'
          });
        } else {
          res.json({
            mensaje: 'could not create user'
          });
        }
      });
    } else {
      res.json({
        mensaje: 'user already exist'
      });
    }
  });
});

module.exports = api;
