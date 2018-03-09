var SearchController = function (view, model, app) {

	view.appetizerButton.click(function(){
		model.setSelectedType("appetizer");
	});

	view.mainCourseButton.click(function(){
		model.setSelectedType("main course");
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