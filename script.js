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
    
    var calculateBudget = function(type){
      var sum = 0
      data.allItems[type].forEach(function(cur){
        sum = sum + cur
      })
      data.totals[type] = sum
     }
		var data = {
			allItems: {
				income: [],
				expense: []
			},
			totals: {
        income: 0,
        expense: 0
      }
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

      calculateAllBudget: function(){
        calculateAllBudget(income);
        calculateAllBudget(expense);
      },

 			getData: function(){
				console.log(data); 
			}
		}
})();


var uiContoller = (function(){
		function resetData(){
			document.querySelector('.add__type').value = "income";
       document.querySelector('.add__description').value = "";
       document.querySelector('.add__value').value = "";
		}

    return {
        getInput: function(){
            return {
                type: document.querySelector('.add__type').value,
                description: document.querySelector('.add__description').value,
                value: parseFloat(document.querySelector('.add__value').value)
            };
				},
				
				addListItem: function(obj, type){
							var element;
							if(type == "income"){
								element = '.income__list'
								var html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
							}else{
								element = '.expenses__list'
								var html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
							}
							
							var newHtml = html.replace('%id%', obj.id);
							newHtml = newHtml.replace('%description%', obj.description);
							newHtml = newHtml.replace('%value%', obj.value);

							document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
							resetData();
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
      var input, item;
      input = uiCntrl.getInput()
      if(input.description != "" && !isNaN(input.value) && input.value > 0){
        item = budgetCntrl.addItem(input.type,input.description,input.value);
        uiCntrl.addListItem(item,input.type);
        console.log(item)
      }
		}

		return {
			init: function(){
				return eventListeners();
			}
		}

})(budgetController, uiContoller);

appController.init();
