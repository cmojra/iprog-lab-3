var AllDishesView = function (container, model, app) {

	
	this.allButton = container.find("#allButton"); //save
	this.searchBox  = container.find("#searchText"); //save

	this.dropDown = container.find("#btnGroupDrop1"); //<-- container.find not working?

	var divLoader = container.find("#all");	

	var dish_types = model.getAllDishTypes();

	var error_div = document.createElement('div');

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

	
	var loadDishes = function (type, filter){
		model.getAllDishes(type, filter, function(dishList){
			allDishes = dishList;
			
			createDishItemHtml(allDishes);
			divLoader.removeClass("loader");

			if(allDishes.length < 1){
				error_div.className = "alert alert-info";
				error_div.innerHTML = "No recipes were found, did you spell correctly?";
				divLoader.append(error_div);
				
			}

		}, function(error){
			divLoader.removeClass("loader");
			error_div.className = "alert alert-danger";
			error_div.innerHTML = "API could not be reached. We are sorry"
			divLoader.append(error_div);
			//console.log("Didn't work");
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

			
			container.find("#all").append(dishItem);

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

			container.find("#all").empty();


		}
	}

	model.addObserver(this.update);


	






}