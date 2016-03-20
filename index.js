var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mongoose = require('mongoose');
var uri = 'mongodb://localhost/mario';
global.db = mongoose.createConnection(uri);

var issues = require('./controllers/issues');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/issues', issues.index);
app.post('/issues', issues.create);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
