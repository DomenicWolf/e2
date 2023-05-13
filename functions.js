function loopy(arr,p) {
    for (o of arr){
        
        if(o.name===p){
            return o
        } 
    }
    return null;
}

function patchy(arr,p) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name===p){
            return i
        }
    }
    return null
}
module.exports = {loopy,patchy}