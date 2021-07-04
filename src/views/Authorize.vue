<template>
  <layout>
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
        <login-box
          v-if="userpass"
          :disabled="disabled"
        ></login-box>
        <mobile-login-box
          v-else
          :disabled="disabled"
        ></mobile-login-box>

        <el-image
          fit="fill"
          class="loginTypeImg"
          :title="loginTypeMsg"
          :src="loginTypeImgUrl"
          @click="changeLoginType"
        >
        </el-image>

        <el-image
          v-for="server in thirdServers"
          :key="server.id"
          :title="server.name + '登录'"
          :src="server.logoUrl"
          @click="thirdLogin(server.id)"
          fit="fill"
          class="loginTypeImg"
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
  </layout>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'
import LoginBox from '@/components/LoginBox.vue'
import MobileLoginBox from '@/components/MobileLoginBox.vue'

import { Message } from 'element-ui'
import { authorize } from '@/api/authorize'
import { getAuthId, setAuthId } from '@/utils/auth'
import { msgShowMilliseconds } from '@/utils/consts'
import { servers, redirectUrl } from '@/api/third_login'

export default {
  name: 'Authorize',
  props: {
    clientId: String,
    responseType: String,
    scope: String,
    state: String,
    redirectUri: String,
    codeChallenge: String
  },
  components: {
    Layout,
    LoginBox,
    MobileLoginBox
  },
  data() {
    return {
      disabled: true,
      userpass: true,
      loginTypeMsg: '手机号登录',
      loginTypeImgUrl: require('@/assets/mobile.png'),
      thirdServers: []
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
    },
    thirdLogin(serverId) {
      redirectUrl(getAuthId(), serverId).then(response => {
        if (response.code === 0) {
          location.assign(response.data.redirectUrl);
          return;
        }
        Message({
          message: response.msg,
          type: 'error',
          duration: msgShowMilliseconds
        });
      })
    }
  },
  created() {
    if (getAuthId()) {
      this.disabled = false;
      return;
    }

    if (!this.clientId || !this.responseType || !this.redirectUri || !this.codeChallenge) {
      Message({
        message: '参数不合法',
        type: 'error',
        duration: msgShowMilliseconds
      });
      return;
    }

    authorize({
      clientId: this.clientId,
      responseType: this.responseType,
      codeChallenge: this.codeChallenge,
      redirectUri: this.redirectUri,
      scope: this.scope,
      state: this.state
    }).then(response => {
      if (response.code !== 0) {
        Message({
          message: response.msg,
          type: 'error',
          duration: msgShowMilliseconds
        });
        return;
      }
      setAuthId(response.data.authId);
      this.disabled = false;
    });

    servers().then(response => {
      if (response.code === 0) {
        this.thirdServers = response.data.servers;
      }
    });
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