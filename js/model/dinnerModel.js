//DinnerModel Object constructor
var DinnerModel = function() {

	//Lab 3
	//starter=appetizer, main dish= main course,
	//Other possible= side dish, salad, breakfast, soup, sauce, drink

	// and selected dishes for the dinner menu
	var numberOfGuests = 1;
	var menu = [];
	var observers = [];
	var selectedDishType = "all";
	var dishSelected = false;
	var searchValue = "";
	var thisDish = [];
	var dishes = [];
	var dish_types = ["appetizer", "breakfast", "main course", "side dish", "salad", "soup", "dessert", "sauce", "drink"];


	
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

		return menu;
	}

	//Return all possible dish types. (Except "All")
	this.getAllDishTypes = function() {

		return dish_types;
	}

	//Lab 3
	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var ingredientsFinal = [];

		
		for(var i = 0; i < menu.length; i++){

			// ceates a list of the dishes ingredients
			var tempIngList = menu.extendedIngredients;

			// gets every ingredient from the list and adds it to the list that is returned
			for(var j = 0; j < tempIngList.length; j++){
				ingredientsFinal.push(tempIngList[j]);
			}
		}

		return ingredientsFinal;
	}

	//Lab 3
	//Returns the total price of the menu.
	this.getTotalMenuPrice = function() {
		var price = 0;
		var tempMenuList = this.getFullMenu();

		for(var i = 0; i < tempMenuList.length; i++){
			price += Math.round(tempMenuList[i].price);
		}

		price *= this.getNumberOfGuests();

		return price;
	}

	//Lab3
	this.getDishPrice = function (dish) {
		return Math.round(dish.price);
	}

	//Adds the passed dish to the menu.
	//Lab 3
	this.addDishToMenu = function(id) {
		//console.log(thisDish);
		if(thisDish.id == id){
			menu.push({
				id: thisDish.id,
				title: thisDish.title,
				image: thisDish.image,
				ingredients: thisDish.extendedIngredients,
				instructions: thisDish.instructions,
				price: thisDish.pricePerServing,
				servings: thisDish.servings
			});
		}
	}

	//TODO Lab 3
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

			//TODO Lab 3 - FIlter doesn't work this way. change to interact per letter
			if(filter){
				if(filter.includes(" ")){
					filter = filter.replace(/ /g,"+");
				}
				GET_RECIPES_URL += "&query=" + filter;
			}
		}
		else if(filter){
			if(filter.includes(" ")){
				filter = filter.replace(/ /g,"+");
			}
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

	//Gets dish with ID via API
	this.getDish = function (id, callback, errorCallback) {

		var GET_RECIPE_INFO = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+ id +"/information";

		$.ajax({
			url: GET_RECIPE_INFO,
			type: "GET",
			dataType: 'json',
			headers: {'X-Mashape-Key': API_KEY},
			success: function(data){
				thisDish = data;
				callback(thisDish);
			},
			error: function(error){
				errorCallback(error);
			}
		});
	}
}
