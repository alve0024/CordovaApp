var groceryItem = [];
var key = "grocery_alve0024";
var lastItem = 0;

$(document).ready(function (ev) {
  loadGroceryList();
  $('#btnAdd').on('click', addItemToList);
  $(document).on('click', '.chkDone', itemDone);
  $(document).on('click', '.btnDel', deleteItem);
  $('.chkDone').on('change', itemDone);
});

function loadGroceryList() {
  // Read the localStorage if localStorage is not Empty
  if (typeof localStorage[key] !== "undefined") {
    groceryItem = JSON.parse(localStorage[key]);
    for (var i = 0; i < groceryItem.length; i++) {
      console.log(groceryItem[i]);
      addGroceryItemToHTML(groceryItem[i]);
    }
    addItemToList();
  }
}

function addGroceryItemToHTML(item) {
  console.log(item['done']);
  var idName = 'chk' + lastItem;
  $('#groceryList').append('<li><input type="checkbox" class="chkDone" id="' + item['idName'] + '" ' + item['done'] + '/>' +
    '<span>' + item['descr'] + '</span> <button class="btnDel">Delete</button></li>');
  lastItem++;
}

function itemDone() {
  if ($(this).prop("checked") == true) {
    var idName = $(this).attr('id');
    console.log(idName);
    groceryItem[idName].done = "checked";
  } else {
    var idName = $(this).attr('id');
    groceryItem[idName].done = "false";
  }
  localStorage[key] = JSON.stringify(groceryItem);
}


function deleteItem() {
  $(this).parent().remove();
  var idName = this.getAttribute('id');
  groceryItem.splice(idName, 1);
  localStorage[key] = JSON.stringify(groceryItem);
}

function addItemToList() {
  var item = $('#txtItem').val();
  if (item !== "") {
    $('#txtItem').val('');
    var gritem = {};
    gritem['idName'] = lastItem;
    gritem['descr'] = item;
    gritem['done'] = 'false';
    groceryItem.push(gritem);
    localStorage[key] = JSON.stringify(groceryItem);
    addGroceryItemToHTML(gritem);
  }
}