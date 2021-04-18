

<template>
  <div>
    <!-- <quill></quill> -->
    <Main :propData='initData'/>
  </div>



</template>



<script>
import Main from './components/Main'
// import quill from "./components/quill.vue";
export default {
  data() {
    return {
      data: "12312",
       initData: 'hello 你好'
    };
  },
  components: {
    // quill,
    Main
  },
};
</script>

<style>
</style>

