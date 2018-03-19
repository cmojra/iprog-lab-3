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

	view.dropDown.click(function(){
		console.log(dropDown);
	})
	//var currentType = model.getSelectedType().replace(/\s+/g, '') + "Button";
	
	view.allButton.click(function(){
		model.setSelectedType("all");
	});

	/*
	$("#" + currentType).click(function(){
		model.setSelectedType(currentType);
		console.log(currentType)
	})
	view.dropDown.click(function(){
		var selected_type = view.dropDown.text;
		model.setSelectedType(selected_type);
	})*/
	//console.log(view.dropDown);

	view.searchBox.on('keyup', function(e){
		if(e.keyCode==13){
			model.search(view.searchBox.val());
			view.searchbox.empty();
		}
	});	
}

/*view.searchDish.click(function() {
		var search_input = view.searchText.value;
		var search_category = view.search_dropdown.value;

		//var filtered_dishes = model.getAllDishesType(search_category,search_input);		
		view.loading.addClass('spinner');
		model.getAllDishes(search_input, search_category, function(dishes){
		 	state_controller.reloadDishItemView(dishes);
		 	view.loading.removeClass('spinner');
		}, function(error) {
			 alert("Woops no recipe found!");
			 view.loading.removeClass('spinner');
		});   
		

});*/