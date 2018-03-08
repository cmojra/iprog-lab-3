//DinnerModel Object constructor
var DinnerModel = function() {

	//Lab 3
	//starter=appetizer, main dish= main course,
	//Other possible= side dish, salad, breakfast, soup, sauce, drink

	// and selected dishes for the dinner menu
	var numberOfGuests = 1;
	var menu = []; //this stores only id's of dishes in our current menu
	var observers = [];
	var selectedDishType = "all";
	var dishSelected = false;
	var searchValue = "";
	var dishes = [];

	var API_KEY = "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB";


	
	// Lab 2: views calls this to add an observer
    this.addObserver = function(observer){ 
    	observers.push(observer); 
    }
   
   // Lab 2: the functions in model.js call this to notify the observers
    this.notifyObservers = function(details){ 
        for(var i = 0; i < observers.length; i++)

        	// a string is passed (details) so the correct observer/view starts an update
    		observers[i](this, details);
    }

    this.dinnerView = function(){
    	this.notifyObservers("dinnerView");
    }

    this.print = function(){
    	this.notifyObservers("print");
    }


	this.setNumberOfGuests = function(num) {		
		numberOfGuests = num;
		
		// Lab 2: notifies the observer that looks for this string
		if(dishSelected){
			this.notifyObservers("numberOfGuests");
		}
		this.notifyObservers("menu");
	}
	
	this.getNumberOfGuests = function() {
		
		return numberOfGuests;
	}

	this.updateMenu = function(){
		this.notifyObservers("menu");
	}

	this.search = function(value){
		searchValue = value;
		this.notifyObservers("search");
	}

	this.getSearchValue = function(){
		return searchValue;
	}

	this.setSelectedType = function(type){
		selectedDishType = type;
		this.notifyObservers("search");
	}

	this.getSelectedType = function(){
		return selectedDishType;
	}

	this.setSelectedDishId = function(id){
    	dishSelected = true;
    	selectedDishId = id;

    	this.notifyObservers("selectedDishId");
    	this.notifyObservers("numberOfGuests");
    }

    this.getSelectedDishId = function(){
    	return selectedDishId;
    }

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		var selectedDish = [];

		for(key in menu){
			var tempDish = this.getDish(menu[key]);

			if (tempDish.type === type) {
				selectedDish = tempDish;
			}
		}

		return selectedDish;
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		/*var tempDishes = [];

		for(key in menu){
			tempDishes.push(this.getDish(menu[key]));
		}

		return tempDishes;*/
		return menu;
	}


	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var ingredientsFinal = [];

		
		for(key in menu){

			// gets all info about the dish
			var tempDish = this.getDish(menu[key]);

			// ceates a list of the dishes ingredients
			var tempIngList = tempDish.ingredients;

			// gets every ingredient from the list and adds it to the list that is returned
			for(ingredient in tempIngList){
				ingredientsFinal.push(tempIngList[ingredient]);
			}
		}

		return ingredientsFinal;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var price = 0;
		var tempIngList = this.getAllIngredients();

		for(ingredient in tempIngList){
			price += tempIngList[ingredient].price;
		}

		price *= this.getNumberOfGuests();

		return price;
	}

	//TODO: fix for lab3
	this.getTotalDishPrice = function (id) {

		var price = 0;
		// gets all info about the dish
			var tempDish = this.getDish(id);

			// ceates a list of the dishes ingredients
			var tempIngList = tempDish.ingredients;

		for(ingredient in tempIngList){

			price += tempIngList[ingredient].price;
		}

		return price;
	}

	//Adds the passed dish to the menu.
	//TODO: Lab 3 - infoController! updateMenu kallas innan rätten
	//blivit tillaggd till menu.
	//?Gör callback i denna funktionen?
	this.addDishToMenu = function(id) {
		this.getDish(id, function(data){
			dish = data;
			menu.push({
				id: dish.id,
				title: dish.title,
				image: dish.image,
				instructions: dish.instructions
			});
			//console.log("ID:" + dish.id);
			console.log(menu);
		}, function(error){
			console.log("Oups something went wrong!");
		});
	
		/*
		// get all info about the passed dish
		var dishToBeAdded = this.getDish(id);
		var tempMenu = [];
		var typeSwapped = false;

		// loop through menu 
		for(key in menu){

			var tempDish = this.getDish(menu[key]);
			
			// if dish types dont match add the current menu item to temp menu
			if(tempDish.type !== dishToBeAdded.type){
				tempMenu.push(tempDish.id);
			}

			// if dish types match, swap current menu item for new
			if(tempDish.type === dishToBeAdded.type){
				tempMenu.push(dishToBeAdded.id);
				typeSwapped = true;
			}
		}

		// if nothing has been swapped add dish to menu
		if (!typeSwapped) {
			tempMenu.push(dishToBeAdded.id);
		}

		menu = tempMenu;
		*/
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		var tempMenu = [];

		for (key in menu){

			// if the menu item doesn't have the same id as the dish we want to remove, we add it to the new menu
			if (menu[key] !== id) {
				tempMenu.push(menu[key]);
			}
		}

		menu = tempMenu;
	}


	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type, filter, callback, errorCallback) {
		var GET_RECIPES_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";

		if(type && type.indexOf("all") == -1){
			type = type.replace(/ /g, "+"); //ex main course --> main+course. Needed for URL
			GET_RECIPES_URL += "?type=" + type;

			if(filter){
				filter = filter.replace(/ /g,"+");
				GET_RECIPES_URL += "&query=" + filter;
			}
		}
		else if(filter){
			filter = filter.replace(/ /g,"+");
			GET_RECIPES_URL += "?query=" + filter;
		}
		
		$.ajax({
			url: GET_RECIPES_URL,
			type: "GET",
			dataType: 'json',
			headers: {'X-Mashape-Key' : API_KEY},
			success: function(data){
				dishes = data.results;
				callback(dishes);
				//console.log(dishes);
			},
			error: function(error){
				errorCallback(error);
			}
		});
	}
	  
	/* Fr Lab 1/2
	  return dishes.filter(function(dish) {
		var found = true;
		if(filter){
			found = false;
			dish.ingredients.forEach(function(ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return dish.type == type && found;
	  });	*/


	//function that returns a dish of specific ID
	/*result
	{... "servings": 4,
		"extendedIngredients": [{"id":xxx, ..., "name":"soy sauce", ..., "amount":2, "unit":"teaspoon"}, {...}, {...}],
		"id": 479101,
		"title": "nameOfDish",
		"image": "jfjf.jpg",
		"instructions": "..."
	}
	*/
	this.getDish = function (id, callback, errorCallback) {

		var GET_RECIPE_INFO = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+ id +"/information";

		$.ajax({
			url: GET_RECIPE_INFO,
			type: "GET",
			dataType: 'json',
			headers: {'X-Mashape-Key': API_KEY},
			success: function(data){
				dish = data;
				callback(dish);
			},
			error: function(error){
				errorCallback(error);
			}
		});

		/* Lab 1-2
	  for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}*/
	}
}
