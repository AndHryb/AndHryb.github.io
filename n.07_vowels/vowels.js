"use strict"
var message = prompt('Введите сообщение');
function vowels(str) {
    let changedStr = str.toLowerCase();
    let vowels = ['а','о','и','e','ё','э','ы','у','ю','я'];
    let count = 0;
    for(let i=0;i<changedStr.length;i++){
      let char = changedStr[i];
      if(vowels.indexOf(char)!== -1){
          count++;
      }
    }
    return count;
}
console.log('Количество гласных букв ' + vowels(message));