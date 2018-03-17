var FoodInfoView = function (container, model) {

	this.addToMenuBtn = container.find("#addToMenuBtn");
	this.backBtn = container.find("#backBtn");

	var info = container.find("#info");
	var recipe = container.find("#recipe");
	
	var dish = ""
	
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

	//TODO: addCLass("loader")
	//En för id="info" och en för id="recipe"
	// Både ligger under #foodInfoView


	this.update = function(model, changeDetails){

		recipeHtml = "";
		totalPrice = 0;
		//divLoader.addClass("loader");
		var dishId = model.getSelectedDishId();
		
					
		
		if (changeDetails === "selectedDishId") {
			model.getDish(dishId, function(data){
				dish = data
				dishName.html(dish.title);
				infoImg.html("<img  src='"+ dish.image + "' class='img-fluid' alt='Responsive image'>");
				infoDescription.html(dish.instructions);
				infoNumberOfGuests.html(model.getNumberOfGuests());
				//divLoader.removeClass("loader");
			}, function(error){
				console.log("Something went wrong");
			});
			
		}

		else if (changeDetails === "numberOfGuests") {
			numberOfGuests.html(model.getNumberOfGuests);

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
				infoTotalPrice.html(Math.round(dish.pricePerServing/dish.servings)*model.getNumberOfGuests());
				recipe.html(recipeHtml);
			})
		}

	}

	model.addObserver(this.update);

	
}
