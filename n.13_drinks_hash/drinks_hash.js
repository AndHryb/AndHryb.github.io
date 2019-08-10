"use strict"
function HashStorage() {
    this.storage= {};
    this.addValue = function(key,value){
        this.storage[key]= value;
    }
    this.getValue= function(key){
        return this.storage[key];
    }
    this.deleteValue= function(key){
        if(key in this.storage){
            delete this.storage[key];
        }else{
            return false;
        }

    }
    this.getKeys = function(){
        return Object.keys(this.storage);
    }
}
var drinkStorage = new HashStorage();
function addDrinkInfo() {
    var drinkName = prompt('Введите название напитка');
    var isAlcogol = confirm('Этот напиток алкогольный?');
    var addRecept = prompt('Рассскажите секрет приготовления этого напитка');
    drinkStorage.addValue(drinkName,{alcogol:isAlcogol,recept:addRecept});
}

function getDrinkInfo() {
    var askDrinkName = prompt('Введите название напитка,о котором хотите получить информацию');
    if (askDrinkName in drinkStorage.storage) {
        console.log((drinkStorage.getValue(askDrinkName).alcogol)? 'Алкогольный напиток':'Безалкогольный Напиток' );
        console.log('Рецепт: ' + drinkStorage.getValue(askDrinkName).recept);
    } else {
        console.log('Информации об этом напитке не найдено')
    }
}
function delDrinkInfo () {
    var delDrinkName = prompt('Введите название напитка,информацию о котором хотите удалить');
    if(delDrinkName in drinkStorage.storage){
        drinkStorage.deleteValue(delDrinkName);
    }else{
        console.log('Информации об этом напитке не найдено')
    }
}
function getAllDrinks() {
    var allDrinks = drinkStorage.getKeys();
    function allDrinksInfo(v,i,a) {
       alert(`
              напиток ${v}          
              алкогольный: ${(drinkStorage.storage[v].alcogol)? 'да':'нет'}
              рецепт приготовления: 
              ${(drinkStorage.storage[v].recept)} 
                
               `)

    }
    allDrinks.forEach(allDrinksInfo);
}
