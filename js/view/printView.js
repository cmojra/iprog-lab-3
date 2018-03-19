var PrintView = function(container, model){

	this.editBtn2 = container.find("#editBtn2");

	var numberOfGuests = container.find("#numberOfGuests");
	var menu = container.find("#menu");

	var currentMenu = model.getFullMenu();

	this.update = function(model, changeDetails){


		if(changeDetails === "print"){
			numberOfGuests.html("<h3>My dinner: " + model.getNumberOfGuests() + " people</h3>");
			menuHtml = "";

			currentMenu = model.getFullMenu();
			for (var i = 0; i < currentMenu.length; i++) {
				var tempDish = currentMenu[i];

				menuHtml += "<div class='container-fluid'>" + 
								"<div class='row'>" + 

									"<div class='col-12 col-md-2' id='margin'>" + 
									"</div>" +

									"<div class='col-12 col-md-4' id='margin'>" + 
										"<h3>" + tempDish.title + "</h3>" + 
										"<div class='text-center'>" +
											"<img class='resize' src=" + tempDish.image + ">" +
										"</div>" + 
										//"<h6>" + tempDish.description + "</h6>" + 
									"</div>" +

									"<div class='col-12 col-md-4' id='margin'> " + 
										"<h4>Preparation</h4>" + 
										"<h6>" + tempDish.instructions + "</h6>" + 
									"</div>" +

								"</div>" + 
							"</div>" ;
			}

				menu.html(menuHtml);

		}
	}

	model.addObserver(this.update);

	
}