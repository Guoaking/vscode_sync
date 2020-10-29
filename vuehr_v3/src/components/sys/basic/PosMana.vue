<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职位..."
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addPosition"
        v-model="pos.name"
      >
      </el-input>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="addPosition"
      >添加</el-button>
    </div>
    <div class="PosManaMain">
      <el-table
        :data="positions"
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
          label="职位名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="150"
        >
        </el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">

            <el-tag
              size="small"
              type="success"
              v-if="scope.row.enabled"
            >已启用</el-tag>
            <el-tag
              size="small"
              type="danger"
              v-else
            >未启用</el-tag>
          </template>
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
      <!--  分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totoal"
        @current-change="currentChange"
        @size-change = "sizeChange"
      >
      </el-pagination>
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
        <div>
          <el-tag>职位名称</el-tag>
          <el-input
            class="updatePosInput"
            v-model="updatePos.name"
          ></el-input>
        </div>
        <div>
          <el-tag>是否启用</el-tag>
          <el-switch
            v-model="updatePos.enabled"
            active-text="启用"
            inactive-text="禁用"
          >
          </el-switch>
        </div>
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
  name: "PosMana",
  data() {
    return {
      pos: {
        name: ""
      },
      // 对话框默认关闭
      dialogVisible: false,
      updatePos: {
        name: "",
        enabled: false
      },
      // 表格数据
      positions: [],
      // 选中数据
      multipleSelection: [],
      //分页
      totoal:0,
      page:1,
      size:10,
    };
  },
  mounted() {
    // 钩子函数，组件初始化时执行
    this.initPositions();
  },
  methods: {
    //
    sizeChange(currentSize){
      this.size = currentSize;
      this.initPositions();
    },
    // 点击页码
    currentChange(currentPage){
      this.page = currentPage;
      this.initPositions();
    },
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
      this.getRequest("/system/basic/pos/?page="+this.page+"&size="+this.size).then(resp => {
        if (resp) {
          this.positions = resp;
          // this.positions = resp.data;
          this.totoal = resp.totoal
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
.updatePosInput {
  width: 200px;
  margin-left: 8px;
}
.addPosInput {
  width: 300px;
  margin-right: 8px;
}
.PosManaMain {
  margin-top: 10px;
}
</style>