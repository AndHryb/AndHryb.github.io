"use strict"
do{
    var name = prompt('Введите ваше имя','');
}
while(!name || name == "null");// возражает вместо null  значение строчкой "null" только в этом цикле поэтому костыль
do{
    var surname = prompt('Введите вашу фамилию','');
}
while(!surname);
do{
    var patronymic = prompt('Введите ваше отчество','');
}
while(!patronymic);
do{
    var year = Number(prompt('Сколько вам полных лет?',''));
}
while(year == 0 || typeof(year) !== "number"|| isNaN(year) );
var gender = confirm('Ваш пол мужской');
var leapYear = parseInt(year*0.25);
var retired
if (year >=65&&gender||year>=60&&!gender){
    retired = 'Да'
}
else {
    retired = 'Нет'
}

alert( `
            Ваше ФИО:${surname} ${name} ${patronymic} 
            Ваш возраст в годах: ${year}
            Ваш возраст в днях : ${((year -leapYear )*365 +(leapYear*366))} 
            Через 5 лет вам будет: ${year + 5} 
            Ваш пол: ${gender?'М':'Ж'}  
            Вы на пенсии?: ${retired}`);
