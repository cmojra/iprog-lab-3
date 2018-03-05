var AllDishesView = function (container, model, app) {

	
	this.startersButton = container.find("#startersButton");
	this.mainDishButton = container.find("#mainDishButton");
	this.dessertButton = container.find("#dessertButton");
	this.allButton = container.find("#allButton");
	this.searchBox  = container.find("#searchText");

	var allDishes = [];

	
	var loadDishes = function (type, filter){
		model.getAllDishes(type, filter, function(dishList){
			allDishes = dishList;
			//console.log(allDishes);
			createDishItemHtml(allDishes);

		}, function(error){
			console.log("Didn't work");
		});


		//	---------- Lab 2 -------------
		/*allDishes = model.getAllDishes("starter", filter);
		var mainDish = model.getAllDishes("main dish", filter);
		for (var i = 0; i < mainDish.length; i++) {
			allDishes.push(mainDish[i]);
		}
		var dessert = model.getAllDishes("dessert", filter);
		for (var i = 0; i < dessert.length; i++) {
			allDishes.push(dessert[i]);
		}

		if (type === "starter") {
			allDishes = model.getAllDishes("starter", filter);
		}

		if (type === "main dish") {
			allDishes = model.getAllDishes("main dish", filter);
		}

		if (type === "dessert") {
			allDishes = model.getAllDishes("dessert", filter);
		}*/
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