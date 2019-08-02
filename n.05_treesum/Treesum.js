"use strict"
function treeSum(a) {
    let sum= 0;
    for(let i=0;i < a.length;i++){
        let element = a[i];
        if(typeof element === "object"){
            sum +=treeSum(element);
        }
        else{
            sum += element;
        };
    }
    return sum
}