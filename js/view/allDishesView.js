var AllDishesView = function (container, model, app) {

	
	this.allButton = container.find("#allButton"); //save
	this.searchBox  = container.find("#searchText"); //save

	this.appetizerButton = container.find("#appetizerButton");
	this.mainCourseButton = container.find("#maincourseButton");
	this.dessertButton = container.find("#dessertButton");
	this.dropDown = container.find("#searchArea .dropdown-menu");
	 //<-- not working! get undefined error

	divLoader = container.find("#all");
	//console.log(divLoader);
	

	var dish_types = model.getAllDishTypes();

	//HTML for drop-down menu with all dishtypes
	//Option, a or button?
	for(var i = 0; i < dish_types.length; i++){
		var a = document.createElement('a');
		var name = dish_types[i].replace(/\s+/g, '') + "Button";

		a.className = "dropdown-item";
		a.type = "button";
		a.id = name;
		a.innerHTML = dish_types[i];
		
		allButton.after(a);

		//this.name = container.find("#" + name);

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
			//console.log("Created dish item" + dishList[i].id);
	    }
	}

	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}

	loadDishes();
	//console.log(allDishes);


	this.update = function(model, changeDetails){
		//divLoader.css("display", "block");
		if (changeDetails === "search") {
			divLoader.addClass("loader");
			allDishes = []; //ful-hack!
			//divLoader.css("display", "block")
			loadDishes(model.getSelectedType(), model.getSearchValue());
			
			//TODO - Model.find doesn't work
			$(document).find("#btnGroupDrop1").empty();
			$(document).find("#btnGroupDrop1").append(model.getSelectedType().capitalize());

			$(document).find("#all").empty();

			//createDishItemHtml(allDishes);
			//divLoader.css("display", "none")

		}
	}

	model.addObserver(this.update);


	






}