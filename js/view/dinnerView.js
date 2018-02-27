var DinnerView = function(container, model){

	this.printBtn = container.find("#printBtn");
	this.editBtn = container.find("#editBtn");

	var numberOfGuests = container.find("#numberOfGuests");
	var menu = container.find("#menu");
	

	var currentMenu = "";
	var menuHtml = "";

	
	this.update = function(model, changeDetails){


		if(changeDetails === "dinnerView"){
			numberOfGuests.html("<h3>My dinner: " + model.getNumberOfGuests() + " people</h3>");
			menuHtml = "";

			currentMenu = model.getFullMenu();
			for (var i = 0; i < currentMenu.length; i++) {
				
				var tempDish = currentMenu[i];

				menuHtml += "<div class='col-md-3 col-12'>" + 
								"<div class='text-center'>" +
									"<img src='images/"+ tempDish.image + "'>" +
								"</div>" + 
								"<div class='text-center'>" +
									"<h3>" + tempDish.name + "</h3>" + 
								"</div>" + 
								"<div class='text-center'>" +
									"<h5>" + model.getTotalDishPrice(tempDish.id)*model.getNumberOfGuests() + " SEK</h5>" + 
								"</div>" + 
							"</div>";
			}

			menuHtml += "<div class='col-md-3 col-12' id='total'>" + 
					"<div class='text-center'>" +
						"<h4>Total:</h4>" + 
						"<h5>" + model.getTotalMenuPrice() + " SEK</h5>" +	
					"</div>" + 
				"</div>";

				menu.html(menuHtml);

		}
	}

	model.addObserver(this.update);

}