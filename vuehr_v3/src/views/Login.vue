<template>
  <div>
    <el-form
      v-loading="loading2"
    element-loading-text="正在登陆..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
      :rules="rules"
      :model="loginForm"
      class="loginContainer"
      ref="loginForm"
    >
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
          @keydown.enter.native="submitLogin"
        />
      </el-form-item>
      <el-checkbox
        v-model="checked"
        class="loginRemember"
      >记住密码</el-checkbox>
      <el-button
        type="primary"
        style="width:100%;"
        @click="submitLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123"
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loading2:false,
    };
  },
  methods: {
    submitLogin() {
      this.loading2 = true;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.postKVRequest("/doLogin", this.loginForm).then(resp => {
            // loading 效果
            this.loading2 = false;
            if (resp) {
              // 登录成功！~ 消息存currentHr 信息
              this.$store.commit("INIT_CURRENTHR",resp.obj)
              window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
              // 拿到url中是否有redirect参数
              let path = this.$route.query.redirect;
              this.$router.replace(
                path == "/" || path == undefined ? "/home" : path
              );
            }
          });
        } else {
          this.$message.error("请输入所有字段后重试！");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}
</style>