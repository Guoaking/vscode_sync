let res_1 = {}
let res_2 = {
  name:"22"
}
let res_3 = {}
let  a = (JSON.stringify(res_1)!="{}")?res_1:(JSON.stringify(res_2)!="{}"?res_2:res_3)

console.log("a", a)
//let a = (JSON.stringify(res_1)!="{}")?res_1:((JSON.stringify(res_2)!="{}")?res_2:res_3)