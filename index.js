var app = require('koa')();
var router = require('koa-router')();

// static file
var serve = require('koa-static');

// template
var views = require('co-views');
var render = views(__dirname + '/views', { ext: 'swig' });

// server and socket io
var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

// database
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/mario';
global.db = app.context.db = mongoose.createConnection(uri);

// controller
var issues = require('./controllers/issues');

app.use(serve(__dirname + '/public'));

router.get('/', function *() {
  this.body = yield render('index');
});
router.get('/issues', issues.index);
router.post('/issues', issues.create);

app.use(router.routes());

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
