<template>
  <div class="index">
    <el-row type="flex">
      <el-col :span="6"></el-col>

      <el-col :span="12">
        <el-alert
          title="OAuth Server running……"
          type="success"
          center
          show-icon
          :closable="false"
        >
        </el-alert>
      </el-col>

      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>