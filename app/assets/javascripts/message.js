$(document).on('turbolinks:load', function(){

  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}">` : "";
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

 var autoUpdate = function(){
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var href = 'api/messages'
    var last_message_id = $('.main__center__lists:last').data("message-id"); 

    $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
    if (messages.length !== 0) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.main__center').append(insertHTML);
      })
      $('.main__center').animate({scrollTop: $('.main__center')[0].scrollHeight}, 'fast');
    }
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
  }
};
setInterval(autoUpdate, 5000);
});