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
            :disabled="show"
            @click="onSend"
          >获取验证码
            <span
              v-show="show"
              class="count"
              v-text="'(' + count + 's)'"
            ></span>
          </el-button>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="loginBtn"
          @click="onLogin"
          :disabled="disabled"
        >登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'

import { send } from '@/api/captcha'
import { getAuthId } from '@/utils/auth';
import { captcha, redirect } from '@/api/login';
import { msgShowMilliseconds } from '@/utils/consts'

const TIME_COUNT = 60;

export default {
  name: 'MobileLoginBox',
  props: {
    disabled: Boolean
  },
  data() {
    var validateCaptcha = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'));
      } else {
        if (!this.target) {
          callback(new Error('请发送验证码'));
          return;
        }
        callback();
      }
    };

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
          { validator: validateCaptcha, trigger: 'blur' },
        ]
      },
      target: null,
      show: false,
      timer: null,
      count: 60
    };
  },
  computed: {
    authId() {
      return getAuthId();
    }
  },
  methods: {
    onSend() {
      this.$refs['from'].validateField('mobile', error => {
        if (!error) {
          this.sendCaptcha();
        }
      });
    },
    sendCaptcha() {
      send({
        authId: this.authId,
        mobile: this.from.mobile
      }).then(data => {
        if (data.code !== 0) {
          Message({
            message: data.msg,
            type: 'error',
            duration: msgShowMilliseconds
          });
          return;
        }

        this.target = data.data.target;

        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = true;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      });
    },
    onLogin() {
      this.$refs['from'].validate((valid) => {
        if (valid) {
          this.login();
          return true;
        } else {
          return false;
        }
      });
    },
    login() {
      captcha({
        authId: this.authId,
        mobile: this.from.mobile,
        captcha: this.from.captcha
      }).then(response => {
        if (response.code !== 0) {
          Message({
            message: response.msg,
            type: 'error',
            duration: msgShowMilliseconds
          });
          return;
        }
        redirect(response.data);
      })
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