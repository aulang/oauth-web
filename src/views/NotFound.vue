<template>
  <layout>
    <el-row type="flex">
      <el-col :span="6"></el-col>

      <el-col :span="12">
        <el-row>
          <el-image
            title="404"
            :src="require('@/assets/404.png')"
          ></el-image>
        </el-row>
        <el-row>
          <el-link
            href="/"
            type="primary"
          >回到首页</el-link>
        </el-row>
      </el-col>

      <el-col :span="6"></el-col>
    </el-row>
  </layout>
</template>

<script>
import Layout from '@/components/Layout.vue'

export default {
  name: 'NotFound',
  components: { Layout }
}
</script>

<style scoped>
</style>