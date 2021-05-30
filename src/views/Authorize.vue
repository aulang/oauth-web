<template>
  <el-container>
    <el-header height="">
      <el-image
        title="logo"
        :src="require('@/assets/logo.png')"
      ></el-image>
    </el-header>

    <el-main>
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
          <login-box v-if="userpass"></login-box>
          <mobile-login-box v-else></mobile-login-box>

          <el-image
            fit="fill"
            class="loginTypeImg"
            :title="loginTypeMsg"
            :src="loginTypeImgUrl"
            @click="changeLoginType"
          >
          </el-image>

          <el-image
            fit="fill"
            title="GitHub登录"
            class="loginTypeImg"
            :src="require('@/assets/github.png')"
          >
          </el-image>
        </el-col>

        <el-col
          :xs="6"
          :sm="8"
          :md="8"
          :lg="9"
          :xl="9"
        ></el-col>
      </el-row>
    </el-main>

    <el-footer height="">
      <bei-an-info></bei-an-info>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import LoginBox from '@/components/LoginBox.vue'
import MobileLoginBox from '@/components/MobileLoginBox.vue'
import BeiAnInfo from '@/components/BeiAnInfo.vue'

export default {
  name: 'Authorize',
  props: {
    clientId: String,
    responseType: String,
    scope: String,
    redirectUri: String,
    state: String
  },
  components: {
    LoginBox,
    MobileLoginBox,
    BeiAnInfo
  },
  data() {
    return {
      userpass: true,
      loginTypeMsg: '手机号登录',
      loginTypeImgUrl: require('@/assets/mobile.png')
    }
  },
  methods: {
    changeLoginType() {
      this.userpass = !this.userpass
      if (this.userpass) {
        this.loginTypeMsg = '手机号登录';
        this.loginTypeImgUrl = require('@/assets/mobile.png')
      } else {
        this.loginTypeMsg = '账号密码登录';
        this.loginTypeImgUrl = require('@/assets/userpass.png')
      }
    }
  }
}
</script>

<style scoped>
.loginTypeImg {
  width: 32px;
  height: 32px;
  cursor: pointer;
  padding: 10px;
}
</style>