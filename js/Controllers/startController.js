var StartController = function (view, model, app) {

	view.newDinnerBtn.click(function(){
		//app.setLoader("block");
		app.showAllDishesView();
	})

}