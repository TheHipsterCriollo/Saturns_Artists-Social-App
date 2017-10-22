const express = require('express');
const mongodb  = require('mongodb');
const app = express();
var bodyParser = require('body-parser');
var path = require('path');

var api = require('./js/api.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/js', express.static('js'));

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
