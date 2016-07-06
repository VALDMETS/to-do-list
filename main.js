var currentTarget = {};
var filterCheck = 1;
var filteredResponse = {};
var allItems = [];
var initPage = {
  url: 'http://tiny-za-server.herokuapp.com/collections/benstodo',
  type: 'GET',
  dataType: 'json',
  success: getAllItems
};

$.ajax(initPage);

function getAllItems (response) {
  if (filterCheck === 0 ) {
    filteredResponse = response;
  } else if (filterCheck === 1) {
    filteredResponse = response.filter(function(item){
      return item.complete === "false";
    });
  } else if (filterCheck === 2) {
    filteredResponse = response.filter(function(item){
      return item.complete === "true";
    });
  }
  console.log(filteredResponse);
  $('.mainview').html('');
  filteredResponse.forEach(divBuilder);
  $('.complete-button').click(completeClick);
  $('.trash-button').click(trashClick);

}
function divBuilder (item, i, arr) {
    if (item.complete === "false") {
    $('.mainview').append('<div class="todoitem"><input type="button" class="complete-button" data-id="' + item._id + '" data-done="' + item.complete + '"><h5>' + item.title + '</h5><p>' + item.details + '</p><input type="button" class="trash-button" data-id="' + item._id + '"></div>');
    } else if (item.complete === "true") {
        $('.mainview').append('<div class="todoitem grayed"><input type="button" class="complete-button" data-id="' + item._id + '" data-done="' + item.complete + '"><h5>' + item.title + '</h5><p>' + item.details + '</p><input type="button" class="trash-button" data-id="' + item._id + '"></div>');
    }
}

function completeClick (evt) {
  // console.log(evt.target.dataset.id);
  currentTarget = {
    url: 'http://tiny-za-server.herokuapp.com/collections/benstodo/' + evt.target.dataset.id,
    type: 'PUT',
    dataType: 'json',
    success: function(){
        $.ajax(initPage);
    }
  };
  if (evt.target.dataset.done === "true") {
      currentTarget = Object.assign(currentTarget, {data: {complete: false}});
      evt.target.dataset.done = "false";
      console.log('made false');
  } else if (evt.target.dataset.done === "false") {
      currentTarget = Object.assign(currentTarget, {data: {complete: true}});
      console.log('made true');
      evt.target.dataset.done = "true";
      // $(evt.target).parent().addClass('hide');
  }
  $(evt.target).parent().addClass('hide');
  $.ajax(currentTarget);
}
function trashClick (evt) {
  console.log('clik trash');
  currentTarget = {
    url: 'http://tiny-za-server.herokuapp.com/collections/benstodo/' + evt.target.dataset.id,
    type: 'DELETE',
    dataType: 'json',
    success: function (){
      console.log('wow wee');
      $.ajax(initPage);
    }
  };
  $(evt.target).parent().addClass('hide');
  $.ajax(currentTarget);
}


$('#new-submit').click(function(evt){
  console.log($('#new-title')[0].value);
  console.log($('#new-details')[0].value);
  currentTarget = {
    url: 'http://tiny-za-server.herokuapp.com/collections/benstodo',
    type: 'POST',
    dataType: 'application/json',
    data: {
      complete: false,
      title: $('#new-title')[0].value,
      details: $('#new-details')[0].value
    },
    success: function () {
      console.log('wow wee');
    }
  };
  $.ajax(currentTarget);
  $.ajax(initPage);
  $('#new-title')[0].value = '';
  $('#new-details')[0].value = '';
});

$('#showneed').click(function(){
  filterCheck = 1;
  $.ajax(initPage);
});
$('#showdone').click(function(){
  filterCheck = 2;
  $.ajax(initPage);
});
$('#showall').click(function(){
  filterCheck = 0;
  $.ajax(initPage);
});
