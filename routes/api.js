const express = require('express');
var bodyParser = require('body-parser');
var api = express.Router();
const fileUpload = require('express-fileupload');
const client = require('mongodb').MongoClient;
var path = require('path');

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

api.get('/home', (req, res) => {
  db.collection('posts')
    .find({})
    .toArray((err, posts) => {
      if (!err) {
        res.json({
          mensaje: 'ok',
          posts: posts
        });
      } else {
        res.json({
          mensaje: 'could not load all posts or there is no any post'
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
        mensaje: 'logged',
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
    };
  });
});
/*
api.post('/api/uploadProfImg/:email', (req, res) => {
  if (!req.files) {
    return res.json({ mensaje: 'no profile image' });
  }
  var foto = req.files.img;
  foto.mv(path.join(__dirname, 'Public/images/profileImg/${foto.name}'), (err) => {
    if (!err) {
      res.json({ mensaje: 'Image was moved to folder'});

      db.collection('users').updateOne({ email: req.params.email}, {
        $set: {
          img: foto.name
        }
      });
    } else {
      res.json({ mensaje: 'could update image', error: err});
    }
  });
});
*/
api.post('/upload/:user', (req, res) => {
  if (!req.files) {
    return res.json({
      mensaje: 'not uploaded image'
    });
  }
  var upload = req.files.img;
  upload.mv(path.join(__dirname, `../Public/images/posts/${upload.name}`), (err) => {
    if (!err) {
      res.json({
        mensaje: 'Image was moved to folder'
      });
      var newPost = {
        user: req.params.user,
        img: upload.name,
        description: req.body.description,
        likes: 0,
        comments: {}
      };
      db.collection('posts').insert(newPost, (err) => {
        if (!err) {
          res.json({
            mensaje: 'post created'
          });
        } else {
          res.json({
            mensaje: 'could not create post'
          });
        }
      });
    } else {
      res.json({
        mensaje: 'could not create posts',
        err: err
      });
    }
  });
});

module.exports = api;
