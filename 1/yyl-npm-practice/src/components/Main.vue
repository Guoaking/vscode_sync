<template>
  <div class="container">
      <div>123</div>
    <div>{{msg}}</div>
    <div>{{propData}}</div>
  </div>
</template>

<script>
export default {
  name: 'yyl-npm-practice',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
      propData: {
          type: String,
          default: '我是默认值'
      }
  }
}
</script>

<style lang="scss">
.container{
    text-align: center;
}
</style>