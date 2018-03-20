var SearchController = function (view, model, app) {

	view.dropDown.change(function(){
		var type = this.value.toLowerCase();
		model.setSelectedType(type);
	})


	view.searchBox.on('keyup', function(e){
		//setQuery is called per keystroke, we only search on enter.
		model.setQuery(view.searchBox.val());
		if(e.keyCode==13){
			model.search();
		}
	});	
}