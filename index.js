var app = require('koa')();
var router = require('koa-router')();

// server and socket io
var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

// database
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/mario';
global.db = app.context.db = mongoose.createConnection(uri);

// controller
var issues = require('./controllers/issues');

// routes
router.get('/issues', issues.index);
router.post('/issues', issues.create);

app.use(router.routes());

// socket
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
