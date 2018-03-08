var InfoController = function (view, model, app) {

	view.addToMenuBtn.click(function(){
		//model.addDishToMenu(model.getSelectedDishId());
		model.updateMenu();
		app.showAllDishesView();
	});

	

	view.backBtn.click(function(){
		app.showAllDishesView();
	});

}