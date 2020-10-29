import { getRequest } from "./api";



/**
 * init菜单工具方法
 * @param {123} router 
 * @param {123} store 
 */
export const initMenu=(router ,store)=>{
    if(store.state.routes.length>0){
        //有菜单数据不用加载了
        return;
    }

    getRequest("/system/config/menu").then(data=>{
        if(data){
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            //存在store中 方法名 store/index.js 中
            store.commit("initRoutes",fmtRoutes)
        }
    })

}

/**
 * 格式化菜单数据
 * @param {*} routes 
 */
export const formatRoutes=(routes)=>{
    //最终返回的数据
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;

        if(children && children instanceof Array){
            //一级菜单，递归调用拿子菜单
            children = formatRoutes(children);
        }
        let fmRouter = {
            path:path,
            name:name,
            iconCls:iconCls,
            meta:meta,
            children:children,
            component(resovle){
                //想当于动态导入组件  resolve
                if(component.startsWith("Emp")){
                    require(["../views/emp/"+component+".vue"],resovle)
                }else if(component.startsWith("Per")){
                    require(["../views/per/"+component+".vue"],resovle)
                }else if(component.startsWith("Sal")){
                    require(["../views/sal/"+component+".vue"],resovle)
                }else if(component.startsWith("Sta")){
                    require(["../views/sta/"+component+".vue"],resovle)
                }else if(component.startsWith("Sys")){
                    require(["../views/sys/"+component+".vue"],resovle)
                }else{
                    require(["../views/"+component+".vue"],resovle)
                }

            }
        }
        fmRoutes.push(fmRouter);
    });

    return fmRoutes

}