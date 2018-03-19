var InfoController = function (view, model, app) {

	view.addToMenuBtn.click(function(){

		model.addDishToMenu(model.getSelectedDishId());
		model.updateMenu();
		view.resetInfo();
		app.showAllDishesView();
	});

	

	view.backBtn.click(function(){
		view.resetInfo();
		app.showAllDishesView();
	});

}