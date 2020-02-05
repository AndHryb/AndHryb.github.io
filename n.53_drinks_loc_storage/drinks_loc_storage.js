"use strict"
function Storage() {
    this.storage= (JSON.parse(localStorage[this])||{});

    this.update = function () {
        localStorage[this]=JSON.stringify(this.storage);
    };
    this.addValue = function(key,value){
        this.storage[key]= value;
    };
    this.getValue= function(key){
        return this.storage[key];
    };
    this.deleteValue= function(key){
        if(key in this.storage){
            delete this.storage[key];
            return true;
        }
        return false;
    };
    this.getKeys = function(){
        return Object.keys(this.storage);
    }
}
var drinkStorage = new Storage();

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
        alert('Информации об этом напитке не найдено');
    }else{
        alert((drinkInfo.alcogol) ? 'Алкогольный напиток' : 'Безалкогольный Напиток');
        alert('Рецепт: ' + drinkInfo.recept);
    }
}

function delDrinkInfo () {
    var delDrinkName = prompt('Введите название напитка,информацию о котором хотите удалить');
    if(drinkStorage.deleteValue(delDrinkName)){
        alert('Напиток удален');
    }else{
        alert('Информации об этом напитке не найдено');
    }
}

function getAllDrinks() {
    var allDrinks = drinkStorage.getKeys();
    alert( allDrinks.join(' , '));
}




