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
										"<div class='text-center'>" +
											"<img src='images/"+ tempDish.image + "'>" +
										"</div>" + 
									"</div>" +

									"<div class='col-12 col-md-4' id='margin'>" + 
										"<h3>" + tempDish.name + "</h3>" + 
										"<h6>" + tempDish.description + "</h6>" + 
									"</div>" +

									"<div class='col-12 col-md-4' id='margin'> " + 
										"<h4>Preparation</h4>" + 
										"<h6>" + "Lorem ipsum dolor sit amet, consectetuer adipiscing" +  
													"elit. Aenean commodo ligula eget dolor. Aenean massa" +  
													"strong. Cum sociis natoque penatibus " + 
													"et magnis dis parturient montes, nascetur ridiculus " + 
													"mus. Donec quam felis, ultricies nec, pellentesque " + 
													"eu, pretium quis, sem. Nulla consequat massa quis " + 
													"enim. Donec pede justo, fringilla vel, aliquet nec, " + 
													"vulputate eget, arcu. In enim justo, rhoncus ut, " + 
													"imperdiet a, venenatis vitae, justo. Nullam dictum " + 
													"felis eu pede link" +  
													"mollis pretium. Integer tincidunt. Cras dapibus. " + 
													"Vivamus elementum semper nisi. Aenean vulputate " + 
													"eleifend tellus. Aenean leo ligula, porttitor eu, " + 
													"consequat vitae, eleifend ac, enim. Aliquam lorem ante," +  
													"dapibus in, viverra quis, feugiat a, tellus. Phasellus " + 
													"viverra nulla ut metus varius laoreet. Quisque rutrum. " + 
													"Aenean imperdiet. Etiam ultricies nisi vel augue. " + 
													"Curabitur ullamcorper ultricies nisi." + 
													"</h6>" + 
									"</div>" +

								"</div>" + 
							"</div>" ;
			}

				menu.html(menuHtml);

		}
	}

	model.addObserver(this.update);

	
}