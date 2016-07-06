$.ajax({
  url: 'http://tiny-za-server.herokuapp.com/collections/benstodo',
  type: 'GET',
  dataType: 'json',
  success: getAllItems
});
var allItems = [];
function getAllItems (response) {
  var allItems = response.map(function(item){
    return item;
  });
  console.log(allItems);
  $('.mainview').html('');
  allItems.forEach(divBuilder);
  $('input').click(completeClick);

}

function divBuilder (item, i, arr) {
  // if (item.complete === "false") {
    $('.mainview').append('<div class="todoitem"><input type="button" data-id="' + item._id + '" data-done="' + item.complete + '" value=""><h5>' + item.title + '</h5><p>' + item.details + '</p></div>');
  // }
}

function completeClick (evt) {
  console.log(evt.target.dataset.id);
  var currentTarget = {
    url: 'http://tiny-za-server.herokuapp.com/collections/benstodo/' + evt.target.dataset.id,
    type: 'PUT',
    dataType: 'json',
    success: function (){
      console.log('i did it!');
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
  }
  $.ajax(currentTarget);
}
