<template>
  <div>
    <!-- 头部工具栏 -->
    <div class="permissManaTool">
      <el-input
        placeholder="请输入角色英文名"
        size="small"
        v-model="role.name"
      >
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        placeholder="请输入角色中文名"
        size="small"
        v-model="role.nameZh"
        @keydown.enter.native="doAddRole"
      ></el-input>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="doAddRole"
      >添加角色</el-button>
    </div>
    <div class="permissManaMain">
      <!-- 手风琴栏 -->
      <el-collapse
        accordion
        @change="change"
        v-model="activeName"
      >
        <el-collapse-item
          :title="r.nameZh"
          :name="r.id"
          v-for="(r,index) in roles"
          :key="index"
        >
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>可访问的资源</span>
              <el-button
                style="float: right; padding: 3px 0； color:#ff0000"
                type="text"
                icon="el-icon-delete"
                @click="deleteRole(r)"
              ></el-button>
            </div>
            <div>
              <el-tree
                :data="allmenus"
                :props="defaultProps"
                show-checkbox
                :default-checked-keys="selectedMenus"
                node-key="id"
                :key="index"
                ref="tree"
              ></el-tree>
              <div style="display:flex; justify-content:flex-end">
                <el-button
                  size="mini"
                  @click="cancelUpdate"
                >取消修改</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="doUpdate(r.id,index)"
                >确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>

      </el-collapse>
    </div>
  </div>
</template>

<script>
import LoginVue from "../../../views/Login.vue";
export default {
  name: "PermissMana",
  data() {
    return {
      role: {
        name: "",
        nameZh: ""
      },
      activeName: -1,
      // 接收角色数组
      roles: [],
      // 菜单
      allmenus: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 选中的菜单
      selectedMenus: []
    };
  },
  mounted() {
    this.initRoles();
  },
  methods: {
    deleteRole(role){
      this.$confirm(
        "此操作将永久删除“" + role.nameZh + "”的角色,是否继续?",
        "⚠️ 警告",
        {
          confirmButtonText: "确认删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest("/system/basic/permiss/role/" + role.id).then(resp => {
            if (resp) {
              // 删除成功刷新表格
              this.initRoles();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    doAddRole() {
      // not null
      if (this.role.name && this.role.nameZh) {
        this.postRequest("/system/basic/permiss/", this.role).then(resp => {
          if (resp) {
            this.role.name = "";
            this.role.nameZh = "";
            this.initRoles();
          }
        });
      }else{
        this.$message.error("不能为空！")
      }
    },
    cancelUpdate() {
      this.activeName = -1;
    },
    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      let selectedKeys = tree.getCheckedKeys(true);
      let url = "/system/basic/permiss/?rid=" + rid;
      selectedKeys.forEach(key => {
        url += "&mids=" + key;
      });
      console.log(url, "url");

      this.putRequest(url).then(resp => {
        if (resp) {
          // this.initRoles();
          this.activeName = -1;
        }
      });
    },
    initRoles() {
      this.getRequest("/system/basic/permiss/").then(resp => {
        if (resp) {
          this.roles = resp;
        }
      });
    },
    change(rid) {
      if (rid) {
        this.initAllMenus();
        this.initSelectdMenus(rid);
      }
    },
    initAllMenus() {
      this.getRequest("/system/basic/permiss/menus").then(resp => {
        if (resp) {
          this.allmenus = resp;
        }
      });
    },
    initSelectdMenus(rid) {
      this.getRequest("/system/basic/permiss/mids/" + rid).then(resp => {
        if (resp) {
          this.selectedMenus = resp;
        }
      });
    }
  }
};
</script>

<style>
.permissManaTool {
  display: flex;
  justify-content: flex-start;
}
.permissManaTool .el-input {
  width: 300px;
  margin-right: 6px;
}
.permissManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>