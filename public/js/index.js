var socket = io();

socket.on('connect',function(){
   console.log("Connected to Server");

});

socket.on('newMessage',function(message){
   console.log("newMessage",message);
 });

socket.on('diconnect',function(){
   console.log("Disconnectd to Server");
});
