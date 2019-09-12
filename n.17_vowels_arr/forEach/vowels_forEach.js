"use strict"
let  message = prompt('Введите сообщение')
function vowels(str) {
    let changedStr = str.toLowerCase();
    let vowels = ['а','о','и','e','ё','э','ы','у','ю','я'];
    let count = 0;
    let mess = changedStr.split('');
    function f(v,i,a) {
        if(vowels.indexOf(v)!==-1){
    count++;
        }
    }
    mess.forEach(f);
    return count;
}
console.log('Количество гласных букв ' + vowels(message));