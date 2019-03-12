var socket = io();

socket.on('connect',function(){
   console.log("Connected to Server");

socket.emit('createMessage',{
  from : 'tanu@example.com',
  text : 'Hey Bhaiyu'
});

});

socket.on('newMessage',function(message){
   console.log("newMessage",message);
 });

socket.on('diconnect',function(){
   console.log("Disconnectd to Server");
});
