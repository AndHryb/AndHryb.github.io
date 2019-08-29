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
            return true;
        }
            return false;
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
    var drinkInfo = drinkStorage.getValue(askDrinkName);
    if(drinkInfo === undefined) {
        console.log('Информации об этом напитке не найдено')
    }else{
        console.log((drinkInfo.alcogol) ? 'Алкогольный напиток' : 'Безалкогольный Напиток');
        console.log('Рецепт: ' + drinkInfo.recept);
    }
}

function delDrinkInfo () {
    var delDrinkName = prompt('Введите название напитка,информацию о котором хотите удалить');
    console.log((drinkStorage.deleteValue(delDrinkName))?'Напиток удален':'Информации об этом напитке не найдено')
}

function getAllDrinks() {
    var allDrinks = drinkStorage.getKeys();
    alert( allDrinks.join(' , '));
}
