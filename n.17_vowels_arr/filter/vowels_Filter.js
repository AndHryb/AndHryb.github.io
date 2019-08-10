"use strict"
let  str = (prompt('Введите сообщение')).toLowerCase();
function vowels() {
    let vowels = ['а','о','и','e','ё','э','ы','у','ю','я'];
    let mess = str.split('');
    function vovelsSearch(v,i,a) {
        if(vowels.indexOf(v)!== -1){
            return true;
        }
    }

     return mess.filter(vovelsSearch).length;
}
console.log('Количество гласных букв ' + vowels());