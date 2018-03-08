var FoodInfoView = function (container, model) {

	this.addToMenuBtn = container.find("#addToMenuBtn");
	this.backBtn = container.find("#backBtn");

	var info = container.find("#info");
	var recipe = container.find("#recipe");
	//var id = model.getSelectedDishId();
	var dish = ""
	//var recipe = container.find("#recipe");
	var infoHtml = "";
	var recipeHtml = "";
	var dishIngredients = "";
	
	var totalPrice = 0;

	var dishName = container.find("#dishName");
	var infoImg = container.find("#infoImg");
	var infoDescription = container.find("#infoDescription");
	var infoNumberOfGuests = container.find("#infoNumberOfGuests");
	var infoTotalPrice = container.find("#infoTotalPrice");



	this.update = function(model, changeDetails){

		recipeHtml = "";
		totalPrice = 0;
		var dishId = model.getSelectedDishId();
		
					
		
		if (changeDetails === "selectedDishId") {
			model.getDish(dishId, function(data){
				dish = data
				dishName.html(dish.title);
				infoImg.html("<img  src='"+ dish.image + "' class='img-fluid' alt='Responsive image'>");
				infoDescription.html(dish.instructions);
				infoNumberOfGuests.html(model.getNumberOfGuests());
				//model.addDishToMenu(dishId);
			}, function(error){
				console.log("Something went wrong");
			});
			
			/*dishName.html(dish.name);
			infoImg.html("<img src='images/"+ dish.image + "' class='img-fluid' alt='Responsive image'>");
			infoDescription.html(dish.description);
			infoNumberOfGuests.html(model.getNumberOfGuests());*/
		}

		else if (changeDetails === "numberOfGuests") {
			model.getDish(dishId, function(data){
				dish = data;
				dishIngredients = dish.extendedIngredients;

				for (var i = 0; i < dishIngredients.length; i++) {
					recipeHtml +=  	"<div class='container-fluid'>" + 
										"<div class='row'>" + 

											"<div class='col-4'>" + 
												dishIngredients[i].amount + " " + 
												dishIngredients[i].unit + 
											"</div>" +

											"<div class='col-5'>" + 
												dishIngredients[i].name + 
											"</div>" +

											"<div class='col-1 d-none d-md-block'>" + 
												"SEK" + 
											"</div>" + 
											
											/*
											"<div class='col-2' style='text-align: right;'>" + 
												dishIngredients[i].price*model.getNumberOfGuests() + 
											"</div>" +*/

										"</div>" + 
									"</div>";

					//totalPrice += dishIngredients[i].price*model.getNumberOfGuests();
				}
				recipe.html(recipeHtml);
			})

			/*
			dish = model.getDish(model.getSelectedDishId());
			dishIngredients = dish.ingredients;
			
			for (var i = 0; i < dishIngredients.length; i++) {
				recipeHtml +=  	"<div class='container-fluid'>" + 
									"<div class='row'>" + 

										"<div class='col-3'>" + 
											dishIngredients[i].quantity + " " + 
											dishIngredients[i].unit + 
										"</div>" +

										"<div class='col-6'>" + 
											dishIngredients[i].name + 
										"</div>" +

										"<div class='col-1 d-none d-md-block'>" + 
											"SEK" + 
										"</div>" + 
										
										"<div class='col-2' style='text-align: right;'>" + 
											dishIngredients[i].price*model.getNumberOfGuests() + 
										"</div>" +

									"</div>" + 
								"</div>";

				totalPrice += dishIngredients[i].price*model.getNumberOfGuests();
			}

			infoTotalPrice.html(totalPrice);
			recipe.html(recipeHtml);
			*/
		}

		

	}

	model.addObserver(this.update);

	

	



}
