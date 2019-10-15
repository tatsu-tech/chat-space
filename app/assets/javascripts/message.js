$(function(){ 
  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}"` : "";
    var html = 
    `<div class="main__center__lists" data-message-id=${message.id}>
      <div class="main__center__lists__message-name">
        ${message.user_name}
      </div>
      <div class="main__center__lists__message-date">
        ${message.date}
      </div>
    </div>
    <div class="main__center__lists__message-text">
      ${message.content}
    </div>
    <div>
      ${image}
    </div>`
    return html;
  }

$('#new_message').on('submit', function(e){
  console.log(this)
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main__center').append(html);
    $('.main__center').animate({scrollTop: $('.main__center')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 });
});