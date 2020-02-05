function uniq(arr) {
    var seen = {};
    var sort = [];
    var j = 0;
    for(var i = 0; i < arr.length; i++) {

        if(seen[arr[i]] !== 1) {
            seen[arr[i]] = 1;
            out[j++] = arr[i];
        }
    }
    return sort;
}
var array = [1,1,2,2,3,4,5,5,5,5,6,6,6,];

console.log(uniq(array));