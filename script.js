var budgetController = (function(){
    var Income = function(id, description, value){
			this.id = id;
			this.description = description;
			this.value = value
		};

		var Expense = function(id, description, value){
			this.id = id;
			this.description = description;
			this.value = value
		}
		var data = {
			allItems: {
				income: [],
				expense: []
			},
			
		};
		return {
			addItem: function(type, description, value){
				var newItem, ID;
				if(data.allItems[type].length > 0){
					ID = data.allItems[type][data.allItems[type].length -1].id + 1
				}else{
					ID = 0
				}
				
				if(type == "income"){
					newItem = new Income(ID,description,value);
				}else if(type == "expense"){
					newItem = new Expense(ID,description,value)
				}
				data.allItems[type].push(newItem)
				return newItem;
			},

			getData: function(){
				console.log(data); 
			}
		}
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
			var item = budgetCntrl.addItem(input.type,input.description,input.value);
			console.log(item)
		}

		return {
			init: function(){
				return eventListeners();
			}
		}

})(budgetController, uiContoller);

appController.init();
