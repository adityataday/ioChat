const express = require('express')
const PORT = 4000
const socket = require('socket.io');

// App setup
const app = express()
const server = app.listen(PORT, function(){
    console.log('Sarted the chat server at port ' + PORT)
})

// Static files
app.use(express.static('public'));

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});