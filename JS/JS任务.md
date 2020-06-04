## 任务

### Promise 微任务 优先级高
```
promise.resolve()
new Preomise(resolve,reject)=>{
    reslove("成功通知")
    reject（"失败通」知"）
}.then(value=>{
    console.log(成功)
},reason=>{
    console.log(失败)
}.then(value=>{
    console.log(成功)
},reason=>{
    console.log(失败)
})


微任务  优先级高  promise
宏任务
定时器也要排队。  宏任务 时间短优先级高
```

### 异步
* js是单线程的。


### ajax