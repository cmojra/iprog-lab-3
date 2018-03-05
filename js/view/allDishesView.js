var AllDishesView = function (container, model, app) {

	
	this.startersButton = container.find("#startersButton");
	this.mainDishButton = container.find("#mainDishButton");
	this.dessertButton = container.find("#dessertButton");
	this.allButton = container.find("#allButton");
	this.searchBox  = container.find("#searchText");

	var allDishes = [];

	
	var loadDishes = function (type, filter){

		if (type === "all") {}
		model.getAllDishes(type, filter, function(dishes){
			allDishes = dishes;
			console.log("Got Data");
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
										"<img  id='" + dishList[i].id + "' src='images/"+ dishList[i].image + "'>" +
									"</a>" + 
								"</div>" +

								"<div class='col-12' style='text-align: center;'>" +
									
										"<h3>" + dishList[i].title + "<h3>" +
											
								"</div>" +
							"</div>");
			model.find("#all").append(dishItem);

			new DishController(dishItem, dishList[i].id, app);
			//console.log("Created dish item" + dishList[i].id);
	    }
	}

	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}

	//loadDishes();

	model.getAllDishes(null, null, function(dishList) {
		allDishes = dishList;
		console.log(allDishes);
	}, function(error){
		console.log("Didn't work");
	});
	
	if(allDishes.length > 0) {
		console.log("HTML");
		for (var i = 0; i < allDishes.length; i++) { 

			var dishItem = $("<div class='col-sm-4 col-12'>" + 
								"<div class='col-12 text-center'>" + 
									"<a>" + 
										"<img  id='" + allDishes[i].id + "' src='images/"+ allDishes[i].image + "'>" +
									"</a>" + 
								"</div>" +

								"<div class='col-12' style='text-align: center;'>" +
									
										"<h3>" + allDishes[i].title + "<h3>" +
											
								"</div>" +
							"</div>");
			model.find("#all").append(dishItem);

			new DishController(dishItem, allDishes[i].id, app);
			//console.log("Created dish item" + dishList[i].id);
	    }
			//createDishItemHtml(dishes);
			console.log(allDishes);
	}

	this.update = function(model, changeDetails){
		
		if (changeDetails === "search") {
			
			loadDishes(model.getSelectedType(), model.getSearchValue());
			
			model.find("#btnGroupDrop1").empty();
			model.find("#btnGroupDrop1").append(model.getSelectedType().capitalize());

			model.find("#all").empty();

			//createDishItemHtml(allDishes);

			
			for (var i = 0; i < allDishes.length; i++) { 

				var dishItem = $("<div class='col-sm-4 col-12'>" + 
									"<div class='col-12 text-center'>" + 
										"<a>" + 
											"<img  id='" + allDishes[i].id + "' src='images/"+ allDishes[i].image + "'>" +
										"</a>" + 
									"</div>" +

									"<div class='col-12' style='text-align: center;'>" +
										
											"<h3>" + allDishes[i].title + "<h3>" +
												
									"</div>" +
								"</div>");
				$model.find("#all").append(dishItem);

				new DishController(dishItem, allDishes[i].id, app);
		    }
		}
	}

	model.addObserver(this.update);


	






}