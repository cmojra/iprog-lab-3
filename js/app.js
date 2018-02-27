$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	model.setNumberOfGuests(1);

	
	// And create the instance of Views and their controllers
	var navView = new NavView($("#navView"), model);
	var navController = new NavController(navView, model, this);// Lab 2: creates the controller that handles the eventlistener

	var allDishesView = new AllDishesView($("#allDishesView"), model, this);
	var serchController = new SearchController(allDishesView, model, this);

	var foodInfoView = new FoodInfoView($("#foodInfoView"), model);
	var infoController = new InfoController(foodInfoView, model, this);

	var startView = new StartView($("#startView"), model);
	var startController = new StartController(startView, model, this);

	var dinnerView = new DinnerView($("#dinnerView"), model);
	var dinnerController = new DinnerController(dinnerView, model, this);

	var printView = new PrintView($("#printView"), model);
	var printController = new PrintController(printView, model, this);

	this.showDishDetails = function(id){
		model.setSelectedDishId(id);
		hideAllViews();
		var div = document.getElementById("leftContainer");
		div.style.display = "block";
		var div = document.getElementById("foodInfoView");
		div.style.display = "block";
	}

	var hideAllViews = function (){
		var div = document.getElementById("startView")
		div.style.display = "none";

		var div = document.getElementById("leftContainer");
		div.style.display = "none";

		var div = document.getElementById("allDishesView");
		div.style.display = "none";

		var div = document.getElementById("foodInfoView");
		div.style.display = "none";

		var div = document.getElementById("printView");
		div.style.display = "none";

		var div = document.getElementById("dinnerView");
		div.style.display = "none";
	}

	this.showAllDishesView = function(){
		hideAllViews();
		var div = document.getElementById("allDishesView");
		div.style.display = "block";

		var div = document.getElementById("leftContainer");
		div.style.display = "block";
	}

	this.showDinnerView = function(){
		hideAllViews();
		var div = document.getElementById("dinnerView");
		div.style.display = "block";
	}

	this.showFoodInfoView = function(){
		hideAllViews();
		var div = document.getElementById("foodInfoView");
		div.style.display = "block";

		var div = document.getElementById("leftContainer");
		div.style.display = "block";
	}

	this.showNavView = function(){
		hideAllViews();
		var div = document.getElementById("leftContainer");
		div.style.display = "block";
	}

	this.showPrintView = function(){
		hideAllViews();
		var div = document.getElementById("printView");
		div.style.display = "block";
	}

	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});