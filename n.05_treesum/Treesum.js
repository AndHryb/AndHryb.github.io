"use strict"
function treeSum(arr) {
    let sum= 0;
    for(let i=0;i < arr.length;i++){
        let element = arr[i];
        if(typeof element === "object"){
            sum +=treeSum(element);
        }
        else{
            sum += element;
        };
    }
    return sum
}
console.log('Проверка :' + treeSum([5,7,[4,[2],8,[1,3],2],[9,[]],1,8] ));