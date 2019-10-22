$(document).on('turbolinks:load', function() {

  function userSearchList(user) {
    var html =
  ` 
    <div class="search-name">
      ${user.name}
      <div class="user-add-button", data-user-id=${user.id}, data-user-name=${user.name}>
        追加
      </div>
    </div>
  `
    $(".chat-group-form__field--right__search__user-name").append(html);
  
  }

  function userSearchListNone() {
    var html =
    `
      <div class="search-name", style="color: red;">
        一致するユーザーはいません
      </div>
    `
    $(".chat-group-form__field--right__search__user-name").append(html);

  }

  function addSelectedUser(id, name) {
    var html =
    `
      <div class="add-selected-user">
        ${name}
        <div class="user-delete-button", data-user-id=${id}, data-user-name=${name}>
          削除
        </div>
        <input name="group[user_ids][]", value="${id}", type="hidden", id="group_name"></input>
      </div>
    `
    $(".chat-group-form__field--right__selected-lists").append(html);
  }

  $('#user-search-field').on("keyup", function() {
    var input = $('#user-search-field').val()

    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: {keyword: input}
    })
    .done(function(users){
      $(".chat-group-form__field--right__search__user-name").empty();
      if (users.length == 0) {
        userSearchListNone();
      }else{
        users.forEach(function(user) {
          userSearchList(user);
        });
      }
    })
    .fail(function(){
      alert("検索に失敗しました");
    })
   });

    $(".chat-group-form__field--right__search__user-name").on("click", ".user-add-button", function() {
      var id = $(this).data('user-id')
      var name = $(this).data('user-name')
      $(this).parent().remove();
      
      addSelectedUser(id, name)
   
    })

    $(document).on("click", ".user-delete-button", function() {
      $(this).parent().remove();
    })
  });