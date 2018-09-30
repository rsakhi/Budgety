var budgetController = (function(){
    
})();


var uiContoller = (function(){
    return {
        getInput: function(){
            return {
                type: document.querySelector('.add__type').value,
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value,
            };
        }
    }
})();


var appController = (function(budgetCntrl, uiCntrl){
   
		var eventListeners = function(){
			document.querySelector('.add__btn').addEventListener('click', appAddItem)

			document.addEventListener('keypress', function(evn){
					if(evn.keyCode == 13){
							appAddItem();
					}
			})
		}

		var appAddItem = function(){
			var input = uiCntrl.getInput()
			console.log(input)
		}

		return {
			init: function(){
				return eventListeners();
			}
		}

})(budgetController, uiContoller);

appController.init();
