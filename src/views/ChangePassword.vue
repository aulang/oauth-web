<template>
  <el-row type="flex">
    <el-col
      :xs="6"
      :sm="8"
      :md="8"
      :lg="9"
      :xl="9"
    ></el-col>

    <el-col
      :xs="12"
      :sm="8"
      :md="8"
      :lg="6"
      :xl="6"
    >
      <change-password-box></change-password-box>
    </el-col>

    <el-col
      :xs="6"
      :sm="8"
      :md="8"
      :lg="9"
      :xl="9"
    ></el-col>
  </el-row>
</template>

<script>
import ChangePasswordBox from '@/components/ChangePasswordBox.vue'
export default {
  name: 'ChangePassword',
  components: {
    ChangePasswordBox
  }
}
</script>

<style scoped>
</style>