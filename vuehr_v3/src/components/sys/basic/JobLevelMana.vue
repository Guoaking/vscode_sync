<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职称..."
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addPosition"
        v-model="pos.name"
      >
      </el-input>
      <el-select
        v-model="pos.titleLevel"
        placeholder="职称等级"
        size="small"
        class="addPosInput"
      >
        <el-option
          v-for="item in titleLevels"
          :key="item"
          :label="item"
          :value="item"
          
        >
        </el-option>
      </el-select>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="addPosition"
      >添加</el-button>
    </div>
    <div class="PosManaMain">
      <el-table
        :data="jls"
        border
        stripe
        size="small"
        style="width: 70%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="职称名称"
          width="180"
        >
        </el-table-column>
                <el-table-column
          prop="titleLevel"
          label="职称级别"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="150"
        >
        </el-table-column>
        <el-table-column label="操作">
          <!-- 占位符 -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showEditView(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="danger"
        size="mini"
        style="margin-top:8px"
        :disabled="multipleSelection.length==0"
        @click="deleteMany"
      >批量删除</el-button>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog
      title="修改职位"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>
        <el-tag>职位名称</el-tag>
        <el-input
          class="updatePosInput"
          v-model="updatePos.name"
        ></el-input>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogVisible  = false"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="doUpdate"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "JobLevelMana",
  data() {
    return {
      pos: {
        name: "",
        titleLevel:''
      },
      titleLevels:[
        "正高级",
        "副高级",
        "中级",
        "初级",
        "员级",
      ],
      // 对话框默认关闭
      dialogVisible: false,
      updatePos: {
        name: ""
      },
      // 表格数据
      jls: [],
      // 选中数据
      multipleSelection: []
    };
  },
  mounted() {
    // 钩子函数，组件初始化时执行
    this.initPositions();
  },
  methods: {
    // 点选事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
    deleteMany() {
      this.$confirm(
        "此操作将永久删除[" +
          this.multipleSelection.length +
          "]条记录,是否继续?",
        "⚠️ 警告",
        {
          confirmButtonText: "确认删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let ids = "?";
          this.multipleSelection.forEach(item => {
            ids += "ids=" + item.id + "&";
          });
          this.deleteRequest("/system/basic/pos/" + ids).then(resp => {
            if (resp) {
              // 删除成功刷新表格
              this.initPositions();
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
    // 初始化表格数据
    initPositions() {
      this.getRequest("/system/basic/pos/").then(resp => {
        if (resp) {
          this.jls = resp;
        }
      });
    },
    // 添加职位
    addPosition() {
      if (this.pos.name) {
        this.postRequest("/system/basic/pos/", this.pos).then(resp => {
          if (resp) {
            this.pos.name = "";
            // 添加成功刷新表格
            this.initPositions();
          }
        });
      } else {
        this.$message.error("数据不能为空，请填写后重试！");
      }
    },
    // 展示编辑对话框
    showEditView(index, data) {
      // 会双向绑定
      // this.updatePos = data;
      //拷贝一下
      Object.assign(this.updatePos, data);
      this.dialogVisible = true;
    },
    //编辑当前行数据
    doUpdate() {
      this.putRequest("/system/basic/pos/", this.updatePos).then(resp => {
        if (resp) {
          this.dialogVisible = false;
          this.initPositions();
          this.updatePos.name = "";
        }
      });
    },
    // 删除当前行
    handleDelete(index, data) {
      this.$confirm(
        "此操作将永久删除“" + data.name + "”的岗位,是否继续?",
        "⚠️ 警告",
        {
          confirmButtonText: "确认删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest("/system/basic/pos/" + data.id).then(resp => {
            if (resp) {
              // 删除成功刷新表格
              this.initPositions();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>