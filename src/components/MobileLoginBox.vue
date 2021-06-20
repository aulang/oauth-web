<template>
  <div class="loginBox">
    <el-form
      :model="from"
      ref="from"
      :rules="rules"
    >
      <el-form-item prop="mobile">
        <el-input
          type="text"
          v-model="from.mobile"
          placeholder="手机号"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item prop="captcha">
        <el-input
          type="text"
          v-model="from.captcha"
          placeholder="验证码"
          clearable
        >
          <el-button
            slot="append"
            type="primary"
          >发送验证码</el-button>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="loginBtn"
          @click="login"
          :disabled="disabled"
        >登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MobileLoginBox',
  props: {
    disabled: Boolean
  },
  data() {
    return {
      from: {
        mobile: '',
        captcha: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    };
  },
  computed: {
  },
  methods: {
    login() {
      global.alert(this.from.mobile);
    }
  }
}
</script>

<style scoped>
.loginBox {
  width: 100%;
}

.loginBtn {
  width: 100%;
}
</style>