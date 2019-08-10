"use strict"
let  str = (prompt('Введите сообщение')).toLowerCase();
function vowels() {
    let vowels = ['а','о','и','e','ё','э','ы','у','ю','я'];
    let count = 0;
    for(let i=0;i<str.length;i++){
      let char = str[i];
      if(vowels.indexOf(char)!== -1){
          count++;
      }
    }
    return count;
}
console.log('Количество гласных букв ' + vowels());