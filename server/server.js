//Setting up the environment
const port = process.env.PORT || 3000;
//Settin up Express
const express = require("express");
//Settin up Socket . io
const socketIO = require("socket.io");
//Settin up http for creating server
const http = require("http");
//For setting path
const path = require("path");

//setting public directory
var publicPath = path.join('__dirname','../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//setting up middleware

// io is responsible for all connections while socket is for only one connection
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User');


    socket.on('createMessage',(message)=>{
      console.log('createMessage',message);
      io.emit('newMessage',{
        from : message.from,
        text : message.text,
        createdAt : new Date().getTime()
      });
    });

socket.on('disconnect',()=>{
    console.log('User was disconnected');
});

});


server.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
});
