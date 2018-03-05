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
		var tempDishes = [];

		for(key in menu){
			tempDishes.push(this.getDish(menu[key]));
		}

		return tempDishes;
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

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
	
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
	//POSTMAN: https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=pizza&type=main+course
	// gives main courses with "pizza" in search.

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
	/*POSTMAN: https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/479101/information
	get information on recipie with id: 479101
	result
	{... "servings": 4,
		"extendedIngredients": [{"id":xxx, ..., "name":"soy sauce", ..., "amount":2, "unit":"teaspoon"}, {...}, {...}],
		"id": 479101,
		"title": "nameOfDish",
		"image": "jfjf.jpg",
		"instructions": "..."
	}
	*/
	this.getDish = function (id) {
	  for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}
	}

/*
	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];*/
}
