<template>
  <div id="app">
    <el-container>
      <el-header height="">
        <el-image
          title="logo"
          :src="require('@/assets/logo.png')"
        ></el-image>
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer height="">
        <bei-an-info></bei-an-info>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import BeiAnInfo from '@/components/BeiAnInfo.vue'
export default {
  components: {
    BeiAnInfo
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
