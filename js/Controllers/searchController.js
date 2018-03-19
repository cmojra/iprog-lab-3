var SearchController = function (view, model, app) {

	view.dropDown.change(function(){
		var type = this.value.toLowerCase();
		//console.log("TYPE: " + type);
		model.setSelectedType(type);
	})


	view.searchBox.on('keyup', function(e){
		if(e.keyCode==13){
			model.search(view.searchBox.val());
		}
	});	
}