var name = prompt('Введите ваше имя','');
while (name == ''){
    name = prompt('Пожалуйста,ведите ваше имя','');
}
var surname = prompt('Введите вашу фаилию','');
while(surname == ''){
    surname = prompt('Пожалуйста,ведите вашу фамилию','');
}
var patronymic = prompt('Введите ваше отчество','');
while(patronymic == ''){
    patronymic = prompt('Пожалуйста,ведите ваше отчество','');
}
var year = parseFloat(prompt('Сколько вам полных лет?',''));
while(year<0 || year>120 || typeof(year) !=="number" ){
    year = parseFloat(prompt('Введите коректно свой возраст',''));
}
var gender = confirm('Ваш пол мужской?');
var sex;
if (gender === true){
    sex = 'мужской'
}
else{
    sex = 'женский'
}
var leapYear = parseInt(year*0.25);
var retired
if (year >65){
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
            Ваш пол: ${sex}  
            Вы на пенсии?: ${retired}`);
