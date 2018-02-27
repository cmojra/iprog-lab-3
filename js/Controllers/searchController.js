var SearchController = function (view, model, app) {

	view.startersButton.click(function(){
		model.setSelectedType("starter");
	});

	view.mainDishButton.click(function(){
		model.setSelectedType("main dish");
	});

	view.dessertButton.click(function(){
		model.setSelectedType("dessert");
	});

	view.allButton.click(function(){
		model.setSelectedType("all");
	});

	view.searchBox.keyup(function(){
		model.search(view.searchBox).val()
	});
	
}