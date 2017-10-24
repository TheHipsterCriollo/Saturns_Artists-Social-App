var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./routes/api.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public/index.html'));
});

app.listen(3000);
