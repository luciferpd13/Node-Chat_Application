 var socket = io();

socket.on('connect',function(){
   console.log("Connected to Server");

});

socket.on('newMessage',function(message){
   console.log("newMessage",message);
   var li = $("<li></li>");
   li.text(`${message.from}: ${message.text}`);

   $('#msg').append(li);
 });

socket.on('diconnect',function(){
   console.log("Disconnectd to Server");
});

$('#msg-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from : "PD",
    text : $('[name=msg]').val()
  } ,function(){

  });

});
