<template>
  <el-form
    :model="from"
    ref="from"
    :rules="rules"
  >
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="from.password"
        placeholder="密码"
        show-password
        clearable
      ></el-input>
    </el-form-item>

    <el-form-item prop="rePassword">
      <el-input
        type="password"
        v-model="from.rePassword"
        placeholder="请再次输入密码"
        show-password
        clearable
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submitBtn"
        @click="submit"
      >修改密码</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: 'ChangePasswordBox',
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
        return;
      } else if (value != this.from.password) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    };

    return {
      from: {
        password: '',
        rePassword: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 128, message: '长度在 6 到 128 个字符', trigger: 'blur' }
        ],
        rePassword: { validator: validatePassword, trigger: 'blur' }
      }
    }
  },
  methods: {
    submit() {
      global.alert(this.password)
    }
  }
}
</script>

<style scoped>
.submitBtn {
  width: 100%;
}
</style>