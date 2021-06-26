<template>
  <el-container>
    <el-header height="">
      <el-image
        title="logo"
        :src="require('@/assets/logo.png')"
      ></el-image>
    </el-header>

    <el-main>
      <slot>

      </slot>
    </el-main>

    <el-footer height="">
      <bei-an-info></bei-an-info>
    </el-footer>
  </el-container>
</template>

<script>
import BeiAnInfo from '@/components/BeiAnInfo.vue'

export default {
  name: 'Layout',
  components: {
    BeiAnInfo
  }
}
</script>

<style scoped>
</style>