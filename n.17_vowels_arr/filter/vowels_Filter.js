"use strict"
let  message = prompt('Введите сообщение');
function vowels(str) {
    let changedStr = str.toLowerCase();
    let vowels = ['а','о','и','e','ё','э','ы','у','ю','я'];
    let mess = changedStr .split('');
    function vovelsSearch(v,i,a) {
        if(vowels.indexOf(v)!== -1){
            return true;
        }
    }

     return mess.filter(vovelsSearch).length;
}
console.log('Количество гласных букв ' + vowels(message));