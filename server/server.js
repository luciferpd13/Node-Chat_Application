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

//importing generatemessage module
const {generatemessage,generateLocationMessage} = require("./utils/message");

//importing validator for deparam
const {isRealString} = require("./utils/validation");

//importing class
const {Users} = require("./utils/users");
var users = new Users();
//setting up middleware

// io is responsible for all connections while socket is for only one connection
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User');



// deparamter for room
    socket.on('join', (params,callback)=>{
        if(!isRealString(params .name) || !isRealString(params.room)){
          callback('Name and Room name are required');
        }
          socket.join(params.room);
          //soket.leave('The OFfice room');
          users.removeUser(socket.id);
          users.addUser(socket.id,params.name,params.room)

          io.to(params.room) .emit('updateUserList',users.getUserList(params.room));
          //this will send only to that user who is sending
              socket.emit('newMessage',generatemessage("Admin","Welcome to chat application"));

              socket.broadcast.to(params.room).emit('newMessage',generatemessage("Admin",`${params.name} has joined.`));

        callback();
    });



//create message
    socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      // This will send message to everyone including the sender
        io.to(user.room).emit('newMessage',generatemessage(user.name,message.text));
    }

      callback();

/* The Broadcast will send message to everybody except the one who send it
      socket.broadcast.emit('newMessage',{
        from : message.from,
        text : message.text,
        createdAt : new Date().getTime()
      });
    });
*/
});

socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit("newMessage", generatemessage('Admin',`${user.name} has left.`));
    }else{

    }
});

socket.on('createLocationMessage',(coords)=>{
  var user = users.getUser(socket.id);
  if(user){
   io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude,coords.longitude))
 }
});

});



server.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
});
