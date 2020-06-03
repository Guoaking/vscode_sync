
function a(){
    let roles = ["管理员", "采样员", "实验员", "实验室负责人", "报告编制人员"]
    let arr = []
    roles.forEach(item=>{
        var a = ""
        if(item ==="实验室负责人") {
            arr.push(item)
            console.log("22") 

        }else if(item ==="实验员") {
            arr.push(item)

        }
    })
    return arr
}
console.log(a())