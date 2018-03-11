var AllDishesView = function (container, model, app) {

	
	//this.appetizerButton = container.find("#appetizerButton");
	//this.mainCourseButton = container.find("#mainCourseButton");
	//this.dessertButton = container.find("#dessertButton");
	this.allButton = container.find("#allButton"); //save
	this.searchBox  = container.find("#searchText"); //save
	//this.dropDown = container.find("#btnGroupDrop1"); <-- can't be found?
	

	var dish_types = model.getAllDishTypes();

	//HTML for drop-down menu with all dishtypes
	//Option, a or button?
	for(var i = 0; i < dish_types.length; i++){
		var option = document.createElement('option');
		var name = dish_types[i].replace(/\s+/g, '') + "Button";

		option.type = "button";
		option.className = "dropdown-item";
		option.value = name;
		option.innerHTML = dish_types[i];
		
		allButton.after(option);

		this.name = container.find("#name");
	}

	var allDishes = [];

	
	var loadDishes = function (type, filter){
		model.getAllDishes(type, filter, function(dishList){
			allDishes = dishList;
			//console.log(allDishes);
			createDishItemHtml(allDishes);

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
									
										"<h3>" + dishList[i].title + "<h3>" +
											
								"</div>" +
							"</div>");

			//TODO: model.find doesnt work?
			$(document).find("#all").append(dishItem);

			new DishController(dishItem, dishList[i].id, app);
			//console.log("Created dish item" + dishList[i].id);
	    }
	}

	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}

	loadDishes();
	//console.log(allDishes);


	this.update = function(model, changeDetails){
		
		if (changeDetails === "search") {
			allDishes = []; //ful-hack!
			
			loadDishes(model.getSelectedType(), model.getSearchValue());
			
			$(document).find("#btnGroupDrop1").empty();
			$(document).find("#btnGroupDrop1").append(model.getSelectedType().capitalize());

			$(document).find("#all").empty();

			createDishItemHtml(allDishes);
		}
	}

	model.addObserver(this.update);


	






}