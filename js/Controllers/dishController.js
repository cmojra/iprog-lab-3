var DishController = function (dish, id, app) {
	
	dish.click(function(){
        app.showDishDetails(id);
    })

}