 var socket = io();


 function scrollToBottom () {
   // Selectors
   var messages = jQuery('#msg');
   var newMessage = messages.children('li:last-child')
   // Heights
   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();

   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
     messages.scrollTop(scrollHeight);
   }
 }



socket.on('connect',function(){
   console.log("Connected to Server");
});


socket.on('newMessage',function(message){
/*   console.log("newMessage",message);
   var formattedTime = moment(message.createdAt).format('h:mm a');
   var li = $("<li></li>");
   li.text(`${message.from} ${formattedTime}:  ${message.text}`);

   $('#msg').append(li); */
     var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
      text : message.text,
      from : message.from,
      createdAt : formattedTime
    });
    $('#msg').append(html);
    scrollToBottom();
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
    $('[name=msg]').val('')
  });

});





var locationButton = $('#send-location') ;
 locationButton.on("click",function(){
   if(!navigator.geolocation){
     return alert('Geolocation Not supported by your browser');
   }

   locationButton.attr('disabled','disabled').text('Sending location...');

   navigator.geolocation.getCurrentPosition(function(position){
     locationButton.removeAttr('disabled').text('Sending location');;
      socket.emit('createLocationMessage',{
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      });
   },function(){
      locationButton.removeAttr('disabled').text('Sending location');;
     alert("Unable to fetch location");
   });
 });






socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-template').html();
  var html = Mustache.render(template,{
   from : message.from,
   url : message.url,
   createdAt : formattedTime
  });
  $('#msg').append(html);
scrollToBottom();
});
