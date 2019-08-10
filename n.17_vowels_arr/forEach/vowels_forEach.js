"use strict"
let  str = (prompt('Введите сообщение')).toLowerCase();
function vowels() {
    let vowels = ['а','о','и','e','ё','э','ы','у','ю','я'];
    let count = 0;
    let mess = str.split('');
    function f(v,i,a) {
        if(vowels.indexOf(v)!==-1){
    count++;
        }
    }
    mess.forEach(f);
    return count;
}
console.log('Количество гласных букв ' + vowels());