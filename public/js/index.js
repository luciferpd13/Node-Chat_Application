var socket = io();

socket.on('connect',function(){
   console.log("Connected to Server"); 
}); 

socket.on('newEmail',function(){
   console.log("New Email");
 });

socket.on('diconnect',function(){
   console.log("Disconnectd to Server"); 
});