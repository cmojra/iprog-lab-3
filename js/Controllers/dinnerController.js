var DinnerController = function (view, model, app) {
	
	view.printBtn.click(function(){
		app.showPrintView();
		model.print();
	});

	view.editBtn.click(function(){
		app.showAllDishesView();
	});

}