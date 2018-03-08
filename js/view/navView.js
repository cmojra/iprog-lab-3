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

	leftMenuHtml = "";

		if (changeDetails === "numberOfGuests") {
			numberOfGuests.html(model.getNumberOfGuests);
		}

		else if(changeDetails === "menu"){
			var dishes = model.getFullMenu();
			numberOfGuests.html(model.getNumberOfGuests);
			for(var i = 0; i < dishes.length; i++){
					//var tempDish = dishes[i];
					leftMenuHtml += '<div class="col-10">' + 
										dishes[i].title + 
									'</div>' + 
									'<div class="col-2" id="cost">' +
										1400 +//model.getTotalDishPrice(tempDish.id)*model.getNumberOfGuests() + 
									'</div>';
				}
			leftMenu.html(leftMenuHtml);
			totalPrice.html("SEK: " + /*model.getTotalMenuPrice()*/0);
			totalPriceNav.html("<h4>SEK " + /*model.getTotalMenuPrice()*/0 + "</h4>");
		}
	}

	model.addObserver(this.update);

	


	


}