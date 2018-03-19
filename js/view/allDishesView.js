var AllDishesView = function (container, model, app) {

	
	this.allButton = container.find("#allButton"); //save
	this.searchBox  = container.find("#searchText"); //save

	this.dropDown = $(document).find("#btnGroupDrop1"); //<-- container.find not working?
	//console.log(dropDown);

	divLoader = container.find("#all");	

	var dish_types = model.getAllDishTypes();

	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}

	//HTML for drop-down menu with all dishtypes
	for(var i = 0; i < dish_types.length; i++){
		var option = document.createElement('option');
		var name = dish_types[i].replace(/\s+/g, '') + "Button";

		option.id = name;
		option.innerHTML = dish_types[i].capitalize();
		
		allButton.after(option);

	}



	var allDishes = [];
//	console.log(appetizerButton);

	
	var loadDishes = function (type, filter){
		model.getAllDishes(type, filter, function(dishList){
			allDishes = dishList;
			//console.log(allDishes);
			createDishItemHtml(allDishes);
			divLoader.removeClass("loader");

		}, function(error){
			console.log("Didn't work");
		});


	}

	var createDishItemHtml = function(dishList){
		for (var i = 0; i < dishList.length; i++) { 

			var dishItem = $("<div class='col-sm-4 col-12'>" + 
								"<div class='col-12 text-center'>" + 
									"<a>" + 
										"<img  class='resize' id='" + dishList[i].id + "' src='https://spoonacular.com/recipeImages/"+ dishList[i].image + "'>" +
									"</a>" + 
								"</div>" +

								"<div class='col-12' style='text-align: center;'>" +
									
										"<h6 class='ellipsis'>" + dishList[i].title + "<h6>" +
											
								"</div>" +
							"</div>");

			//TODO: model.find doesnt work?
			$(document).find("#all").append(dishItem);

			new DishController(dishItem, dishList[i].id, app);
	    }
	}


	loadDishes();
	//console.log(allDishes);


	this.update = function(model, changeDetails){
		if (changeDetails === "search") {
			divLoader.addClass("loader");
			allDishes = [];
			loadDishes(model.getSelectedType(), model.getSearchValue());

			//TODO - Model.find doesn't work?
			$(document).find("#all").empty();


		}
	}

	model.addObserver(this.update);


	






}