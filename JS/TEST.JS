
let numbers = [1,2,4,5,6,7,2,2,2,2]


function reduce_count(arr,item){
    // rval val key arr
   return  arr.reduce((a,b,c,d)=>{
        return a += item == b?1:0 
    },0)

}

function reduce_max(arr){
    // rval val key arr
   return  arr.reduce((a,b,c,d)=>{
        return a>b?a:b
    })

}
console.log(reduce_max(numbers));