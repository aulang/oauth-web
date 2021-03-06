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
              :src="captchaUrl"
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
          @click="onLogin"
          :loading="loading"
          :disabled="disabled"
        >登&emsp;录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { login, redirect } from '@/api/login'
import { getAuthId, setSSO } from '@/utils/auth';
import { apiBaseUrl, msgShowMilliseconds, errorCodes } from '@/utils/consts'

export default {
  name: 'LoginBox',
  props: {
    disabled: Boolean
  },
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
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 128, message: '长度在 6 到 128 个字符', trigger: 'blur' }
        ],
        captcha: { validator: validateCaptcha, trigger: 'blur' }
      },
      loading: false,
      rememberMe: true,
      needCaptcha: false
    };
  },
  computed: {
    authId() {
      return getAuthId();
    },
    captchaUrl() {
      if (this.needCaptcha) {
        return `${apiBaseUrl}/captcha/${this.authId}`
      } else {
        return ''
      }
    }
  },
  methods: {
    onLogin() {
      this.$refs['from'].validate((valid) => {
        if (valid) {
          this.submit();
          return true;
        } else {
          return false;
        }
      });
    },
    submit() {
      this.loading = true;

      login({
        authId: this.authId,
        username: this.from.username,
        password: this.from.password,
        captcha: this.from.captcha
      }).then(response => {
        if (response.code === errorCodes.needApproval) {
          // 需要授权，重定向到授权页面
          this.$router.push('/approval');
          return;
        } else if (response.code === errorCodes.passwordExpired) {
          // 密码过期，修改密码
          this.$router.push('/change-pwd');
          return;
        } else if (response.code === errorCodes.accountLocked) {
          // 账号锁定
          this.$router.push('/locked');
          return;
        }

        if (response.code !== 0) {
          Message({
            message: response.msg,
            type: 'error',
            duration: msgShowMilliseconds
          });
          this.needCaptcha = !!response.data.needCaptcha;
          return;
        }
        setSSO(response.data.authId);
        redirect(response.data);
      });

      this.loading = false;
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