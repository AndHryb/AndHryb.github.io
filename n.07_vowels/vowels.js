"use strict"
function vowels(str) {
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