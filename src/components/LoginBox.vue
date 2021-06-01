<template>
  <div class="loginBox">
    <el-form
      :model="from"
      ref="from"
      :rules="rules"
    >
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="from.username"
          placeholder="用户名"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="from.password"
          placeholder="密码"
          show-password
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item v-if="needCaptcha">
        <el-col :span="16">
          <el-form-item prop="captcha">
            <el-input
              type="text"
              v-model.number="from.captcha"
              placeholder="验证码"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-image
              fit="fill"
              :src="require('@/assets/captcha.png')"
            ></el-image>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-checkbox
          label="记住账号"
          v-model="rememberMe"
        ></el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="loginBtn"
          @click="login"
        >登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
  data() {
    var validateCaptcha = (rule, value, callback) => {
      if (!this.needCaptcha) {
        callback();
        return;
      }

      if (!Number.isInteger(value)) {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };

    return {
      from: {
        username: '',
        password: '',
        captcha: null
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 128, message: '长度在 6 到 128 个字符', trigger: 'blur' }
        ],
        captcha: { validator: validateCaptcha, trigger: 'blur' }
      },
      rememberMe: true,
      needCaptcha: true
    };
  },
  computed: {
    captchaUrl() {
      return '';
    }
  },
  methods: {
    login() {
      global.alert(this.from.username);
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