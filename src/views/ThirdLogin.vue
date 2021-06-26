<template>
  <layout>
    <el-row type="flex">
      <el-col :span="6"></el-col>

      <el-col :span="12">
        <el-alert
          title="登录失败"
          type="warning"
          center
          show-icon
          :closable="false"
        >
          <el-link
            href="/"
            type="warning"
          >回到首页</el-link>
        </el-alert>

      </el-col>

      <el-col :span="6"></el-col>
    </el-row>
  </layout>
</template>

<script>
import Layout from '@/components/Layout.vue'

export default {
  name: 'ThirdLogin',
  components: { Layout },
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    setMsg(msg) {
      alert(msg);
      console.log(msg);
      this.msg = msg;
    }
  }
}
</script>

<style scoped>
</style>