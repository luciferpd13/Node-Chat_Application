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

var locationButton = $('#send-location') ;
 locationButton.on("click",function(){
   if(!navigator.geolocation){
     return alert('Geolocation Not supported by your browser');
   }

   navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      });
   },function(){
     alert("Unable to fetch location");
   });
 });

socket.on('newLocationMessage',function(message){
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  $('#msg').append(li);
});
