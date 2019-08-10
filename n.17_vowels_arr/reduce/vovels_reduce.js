"use strict"
let  str = (prompt('Введите сообщение')).toLowerCase();
function vowels(){
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
console.log('Количество гласных букв ' + vowels());