var budgetController = (function(){
    var x = 5
    console.log("BudgetCntl");

    return {
        setData: function(val){
            x = val
        },

        getData: function(){
            return x;
        }
    }
})();


var uiContoller = (function(){
    console.log("UIcntm");
})();


var appController = (function(budgetCntrl, uiCntrl){
    budgetCntrl.setData(4);
    var y = budgetCntrl.getData();
    console.log("App" + y);

})(budgetController, uiContoller);


