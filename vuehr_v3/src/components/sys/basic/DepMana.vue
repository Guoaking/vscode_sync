<template>
  <div>
    <el-input
      placeholder="输入部门名称进行搜索"
      v-model="filterText"
      prefix-icon="el-icon-search"
    >
    </el-input>

    <el-tree
      :data="deps"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="tree2"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "DepMana",
  data() {
    return {
      filterText: "",
      deps: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  mounted() {
    this.initDeps();
  },
  methods: {
    initDeps() {
      this.getRequest("system/basic/department/").then(data => {
        if (data) {
          this.deps = data;
        }
      });
    },
    // 过滤方法 最新值，json对象
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  },
  watch: {
    // 
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  }
};
</script>

<style>
</style>