<template>
  <el-row type="flex">
    <el-col :span="6"></el-col>

    <el-col :span="12">
      <el-image
        title="404"
        :src="require('@/assets/404.png')"
      ></el-image>
      <el-link
        href="/"
        type="primary"
      >回到首页</el-link>
    </el-col>

    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>

export default {
  name: 'NotFound'
}
</script>

<style scoped>
</style>