var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000, function () {
    console.log('listening on *:3000');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (client) {
    console.log('Client connected..');
    client.on('join', function (data) {
        console.log(data);
    });
    setInterval(function () {
        var currentDate = new Date();
        io.sockets.emit('clock', { currentDate: currentDate });
    }, 1000);
});