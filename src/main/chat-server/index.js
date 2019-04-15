const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

http.listen(port, function() {
    console.log('listening on *:' + port);
});

io.on('connection', function(socket){
    socket.on('new-message', function(msg){
        this.broadcast.emit('new-message', msg);
    });
});
