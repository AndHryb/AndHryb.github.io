"use strict"
function vowels(str) {
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