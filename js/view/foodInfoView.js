var FoodInfoView = function (container, model) {

	this.addToMenuBtn = container.find("#addToMenuBtn");
	this.backBtn = container.find("#backBtn");

	var info = container.find("#info");
	var recipe = container.find("#recipe");
	
	var dish = ""
	var dishId = "";
	
	var infoHtml = "";
	var recipeHtml = "";
	var dishIngredients = "";
	
	var totalPrice = 0;

	var dishName = container.find("#dishName");
	var infoImg = container.find("#infoImg");
	var infoDescription = container.find("#infoDescription");
	var infoNumberOfGuests = container.find("#infoNumberOfGuests");
	var infoTotalPrice = container.find("#infoTotalPrice");
	var numberOfGuests = container.find("#numberOfGuests");
	numberOfGuests.html(model.getNumberOfGuests);

	//Resets info after we leave foodInfoView, so we 
	this.resetInfo = function(){
		recipe.empty();
		dishName.empty();
		infoImg.empty();
		infoDescription.empty();
		infoNumberOfGuests.empty();
		//infoTotalPrice.empty();
	}


	this.update = function(model, changeDetails){

		recipeHtml = "";
		totalPrice = 0;
		//container.addClass("loader");
			
		
		if (changeDetails === "selectedDishId") {

			dishId = model.getSelectedDishId();

			infoImg.addClass("loader");
			recipe.addClass("loader");
			model.getDish(dishId, function(data){
				dish = data
				dishName.html(dish.title);
				infoImg.html("<img  src='"+ dish.image + "' class='img-fluid' alt='Responsive image'>");
				infoDescription.html(dish.instructions);
				infoNumberOfGuests.html(model.getNumberOfGuests());
				recipe.removeClass("loader");
				//container.removeClass("loader");
				infoImg.removeClass("loader");
				
			}, function(error){
				console.log("Something went wrong");
			});
			
		}

		else if (changeDetails === "numberOfGuests") {
			numberOfGuests.html(model.getNumberOfGuests);
			dishId = model.getSelectedDishId();

			model.getDish(dishId, function(data){
				dish = data;
				dishIngredients = dish.extendedIngredients;

				for (var i = 0; i < dishIngredients.length; i++) {
					var amount = ((dishIngredients[i].amount / dish.servings).toFixed(4))*model.getNumberOfGuests();
					recipeHtml +=  	"<div class='container-fluid'>" + 
										"<div class='row'>" + 

											"<div class='col-5'>" + 
												amount + " " + 
												dishIngredients[i].unit + 
											"</div>" +

											"<div class='col-5'>" + 
												dishIngredients[i].name + 
											"</div>" +

										"</div>" + 
									"</div>";

				}
				recipe.removeClass("loader");
				infoTotalPrice.html(Math.round(dish.pricePerServing/dish.servings)*model.getNumberOfGuests());
				recipe.html(recipeHtml);
			})
		}

	}

	model.addObserver(this.update);

	
}
