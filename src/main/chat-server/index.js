const app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});

io.on('connection', function(socket){
    socket.on('new-message', function(msg){
        io.emit('new-message', msg);
    });
});
