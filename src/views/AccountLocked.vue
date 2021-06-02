<template>
  <el-row type="flex">
    <el-col :span="6"></el-col>

    <el-col :span="12">
      <el-alert
        title="您尝试的次数过多，请等待5分钟后再试！"
        type="warning"
        center
        show-icon
        :closable="false"
      >
        <span class="el-link">您可以选择：</span>

        <el-link
          type="warning"
          :href="url"
        >回到首页</el-link>
      </el-alert>
    </el-col>

    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AccountLocked',
  data() {
    return {
      url: 'https://aulang.cn'
    }
  }
}
</script>

<style scoped>
</style>