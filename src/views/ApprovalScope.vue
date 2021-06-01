<template>
  <el-form>
    <el-form-item>
      <span v-text="'授权' + clientName + '访问您的：'"></span>
    </el-form-item>

    <el-form-item>
      <el-checkbox-group v-model="approvalScopes">
        <el-checkbox
          v-for="scope in scopes"
          :key="scope.code"
          :label="scope.code"
          :checked="scope.approved"
        >
          <span v-text="scope.name"></span>
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="approval"
      >授&emsp;权</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ApprovalScope',
  data() {
    return {
      clientId: '',
      clientName: 'clientName',
      scopes: [{
        code: 'code1',
        name: 'name1',
        approved: true
      },
      {
        code: 'code2',
        name: 'name2',
        approved: false
      }],
      approvalScopes: []
    }
  },
  methods: {
    approval() {
      console.log(this.approvalScopes)
    },
    reject() {
      console.log(this.approvalScopes)
    }
  }
}
</script>

<style scoped>
</style>