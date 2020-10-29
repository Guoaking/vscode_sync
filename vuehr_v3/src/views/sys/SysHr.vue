<template>
  <div>
    <div style="margin-top:10px;display:flex; justify-content:center;">
      <el-input
        v-model="keywords"
        placeholder="通过用户名称搜索用户..."
        prefix-icon="el-icon-search"
        style="width:400px; margin-right:10px"
        @keydown.enter.native="doSearch"
      ></el-input>
      <el-button
        icon="el-icon-search"
        type="primary"
        @click="doSearch"
      >搜索</el-button>
    </div>
    <div class="hr-container">
      <el-card
        class="hr-card"
        :key="index"
        v-for="(hr,index) in hrs"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span>{{hr.name}}</span>
          <el-button
            style="float: right; padding: 3px 0; color:#ff0000"
            type="text"
            icon="el-icon-delete"
          ></el-button>
        </div>
        <div>
          <div class="img-container">
            <img
              :src="hr.userface"
              :alt="hr.name"
              :title="hr.name"
              class="userface-img"
            />
          </div>
          <div class="user-container">
            <div>用户名：{{hr.name}}</div>
            <div>手机号码：{{hr.phone}}</div>
            <div>电话号码：{{hr.telephone}}</div>
            <div>地址：{{hr.address}}</div>
            <div>用户状态:
              <el-switch
                v-model="hr.enabled"
                active-text="启用"
                inactive-text="禁用"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </div>
            <div>
              用户角色：
              <el-tag
                type="success"
                v-for="(role,index) in hr.roles"
                :key="index"
                style="margin-right:4px"
              >{{role.nameZh}}</el-tag>
              <el-button
                icon="el-icon-more"
                type="text"
              ></el-button>
            </div>
            <div>备注：{{hr.remark}}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysHr",
  data() {
    return {
      keywords: "",
      // 用来保存查到的数据
      hrs: []
    };
  },
  mounted() {
    this.initHrs();
  },
  methods: {
    doSearch(){
      this.initHrs();
    },
    initHrs() {
      this.getRequest("/system/hr/?keywords="+this.keywords).then(resp => {
        if (resp) {
          this.hrs = resp;
        }
      });
    }
  }
};
</script>

<style>
.user-container div {
}
.user-container {
  margin-top: 20px;
}
.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.userface-img {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}
.hr-container {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.hr-card {
  width: 350px;
  margin-bottom: 20px;
}
</style>