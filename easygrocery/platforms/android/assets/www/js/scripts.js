var groceryItem = [];
var key = "grocery_alve0024";
var lastItem = 0;

document.addEventListener('DOMContentLoaded', init);

function init(){
	//Run the code to initiatize
}

$(document).ready(function(ev){
	loadGroceryList();
	$('#btnAdd').on('click', addItemToList);
	$(document).on('click', '.chkDone', itemDone);
	$(document).on('click', '.btnDel', deleteItem);
});

function loadGroceryList() {
	// Read the localStorage if localStorage is not Empty
	if (typeof localStorage[key] !== "undefined") {
	  	groceryItem = JSON.parse(localStorage[key]);
	  	for(var i=0; i<groceryItem.length; i++) {
	  		console.log(groceryItem[i]);
	  		addGroceryItemToHTML(groceryItem[i]);
	  	}	
	  	addItemToList();
	}
}	

function addGroceryItemToHTML(item) {
	console.log(item);
	var idName = 'chk'+lastItem;
	$('#groceryList').append('<li><input type="checkbox" checked="'+item['done']+'" class="chkDone" id="'+item['idName']+'" />'+
			'<span>'+item['descr']+'</span> <button class="btnDel">Delete</button></li><hr />');
	lastItem++;
}

function itemDone() {
	if ($(this).parent().css('textDecoration') == 'line-through') {
		$(this).parent().css('textDecoration', 'none');
	} else {
	$(this).parent().css('textDecoration', 'line-through');
	}
	var idName = this.getAttribute('id');
	groceryItem[idName].done = "checked";
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
		gritem['done'] = '';
		groceryItem.push(gritem);
		localStorage[key] = JSON.stringify(groceryItem);
		addGroceryItemToHTML(gritem);
	}
}