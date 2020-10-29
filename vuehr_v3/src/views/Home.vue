<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header class="homeHeader">
        <div class="title">微人事</div>
        <el-dropdown
          class="userInfo"
          @command="commandHandler"
        >
          <span class="el-dropdown-link">
            {{user.name}}<i><img
                :src="user.userface"
                alt="用户头像"
              ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item
              command="logout"
              divided
            >注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 左--右 -->
      <el-container>
        <!-- 左边 -->
        <el-aside width="200px">
          <!-- @select、router 使用vue-router模式，不用写点击方法了 -->
          <el-menu @select="menuClick">
            <!-- 为了 v-for 与v-if 同时使用而不提示错误。 -->
            <template v-for="(item, index) in routes">
              <el-submenu
                :index="index+''"
                :key="index"
                v-if="!item.hidden"
                class="iconStyle"
              >
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item
                  :index="child.path"
                  :key="indexj"
                  v-for="(child,indexj) in item.children"
                >{{child.name}}</el-menu-item>
              </el-submenu>
            </template>

          </el-menu>
        </el-aside>
        <el-main>
          <!-- main -->
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div v-if="this.$router.currentRoute.path=='/home'" class="homeWelcome">
            欢迎来到微人事！

          </div>
          <!-- 路由 -->
          <router-view  class="homeRouterView" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    };
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    }
  },
  methods: {
    //注销操作
    commandHandler(cmd) {
      if (cmd == "logout") {
        this.$confirm("此操作将注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //调用退出登录接口
            this.getRequest("/logout");
            //清除session用户信息
            window.sessionStorage.removeItem("user");
            //清除store菜单数据
            this.$store.commit("initRoutes", []);
            //跳转登录页
            this.$router.replace("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },

    // 点击左侧菜单操作
    menuClick(index) {
      this.$router.push(index);
    }
  }
};
</script>

<style>
.homeRouterView{
  margin-top: 20px;
}
.homeWelcome{
  text-align: center;
  font-size: 30px;
  color: #409eff;
  padding-top: 50px;
}
.homeHeader {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title {
  font-size: 30px;
  color: #fff;
  font-family: "Courier New", Courier, monospace;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}

.iconStyle i {
  color: #409eff;
  margin-right: 5px;
}
</style>