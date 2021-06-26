<template>
  <layout>
    <el-form>
      <el-form-item>
        <span v-text="'授权【' + clientName + '】访问您的：'"></span>
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
          type="danger"
          @click="onReject"
        >拒&emsp;绝</el-button>

        <el-button
          type="primary"
          @click="onApproval"
        >授&emsp;权</el-button>
      </el-form-item>
    </el-form>
  </layout>
</template>

<script>
import Layout from '@/components/Layout.vue'

import { getAuthId } from '@/utils/auth'
import { getApproval, approval, reject } from '@/api/approval'
import { Message } from 'element-ui'
import { msgShowMilliseconds } from '@/utils/consts'
import { redirect, rejectRedirect } from '@/api/login'

export default {
  name: 'ApprovalScope',
  components: { Layout },
  data() {
    return {
      clientId: '',
      clientName: '',
      scopes: [{
        code: '',
        name: '',
        approved: false
      }],
      approvalScopes: []
    }
  },
  computed: {
    authId() {
      return getAuthId();
    }
  },
  methods: {
    onApproval() {
      approval(this.authId, this.approvalScopes).then(response => {
        if (response.code === 0) {
          redirect(response.data);
          return;
        }

        Message({
          message: response.msg,
          type: 'error',
          duration: msgShowMilliseconds
        });
      });
    },
    onReject() {
      reject(this.authId).then(response => {
        if (response.code === 0) {
          rejectRedirect(response.data);
          return;
        }

        Message({
          message: response.msg,
          type: 'error',
          duration: msgShowMilliseconds
        });
      });
    }
  },
  mounted() {
    getApproval(this.authId).then(response => {
      if (response.code !== 0) {
        Message({
          message: response.msg,
          type: 'error',
          duration: msgShowMilliseconds
        });
        return;
      }
      this.scopes = response.data.scopes;
      this.clientId = response.data.clientId;
      this.clientName = response.data.clientName;
    });
  }
}
</script>

<style scoped>
.el-form-item .el-button {
  margin: 1rem;
}
</style>