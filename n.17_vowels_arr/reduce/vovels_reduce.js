"use strict"
let  message = prompt('Введите сообщение');
function vowels(str){
    str.toLowerCase();
    let vowels = {'а':true,'о':true,'и':true,'e':true,'ё':true,'э':true,'ы':true,'у':true,'ю':true,'я':true};
    let mess = str.split('');
    function vovelsSearch(r,v,i,a){
        if(v in vowels){
            r++
        }
        return r
    };
    return  mess.reduce(vovelsSearch ,0)
};
console.log('Количество гласных букв ' + vowels(message));