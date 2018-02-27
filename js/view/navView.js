var NavView = function(container, model){

	this.plusButton = container.find("#plusBtn");
	this.minusButton = container.find("#minusBtn");
	this.confirmDinnerBtn = container.find("#confirmDinnerBtn");

	var numberOfGuests = container.find("#numberOfGuests");
	numberOfGuests.html(model.getNumberOfGuests);

	var leftMenu = container.find("#leftMenu");
	var leftMenuHtml = "";
	var dishes = "";
	var totalPrice = container.find("#totalPrice");
	var totalPriceNav = container.find("#totalPriceNav");




	this.update = function(model, changeDetails){

	var dishes = model.getFullMenu();
	leftMenuHtml = "";

		if (changeDetails === "numberOfGuests") {
			numberOfGuests.html(model.getNumberOfGuests);
		}

		else if(changeDetails === "menu"){
			numberOfGuests.html(model.getNumberOfGuests);
			for(var i = 0; i < dishes.length; i++){
					var tempDish = dishes[i];
					leftMenuHtml += '<div class="col-10">' + 
										tempDish.name + 
									'</div>' + 
									'<div class="col-2" id="cost">' +
										model.getTotalDishPrice(tempDish.id)*model.getNumberOfGuests() + 
									'</div>';
				}
			leftMenu.html(leftMenuHtml);
			totalPrice.html("SEK: " + model.getTotalMenuPrice());
			totalPriceNav.html("<h4>SEK " + model.getTotalMenuPrice() + "</h4>");
		}
	}

	model.addObserver(this.update);

	


	


}