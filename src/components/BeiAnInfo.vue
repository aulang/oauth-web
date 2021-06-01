<template>
  <div>
    <el-row class="copyright">
      <span v-text="'©' + year"></span>
      <span v-text="author"></span>
    </el-row>

    <el-row class="beian">
      <el-link
        class="gxb"
        target="_blank"
        href="http://beian.miit.gov.cn"
      >鄂ICP备18028762号</el-link>

      <el-image
        title="备案"
        :src="require('@/assets/beian.png')"
      ></el-image>

      <el-link
        class="gab"
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011102003833"
      >鄂公网安备42011102003833号</el-link>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BeiAnInfo',
  data() {
    return {
      author: 'Aulang'
    }
  },
  computed: {
    year() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.copyright {
  margin-top: 2rem;
}
.copyright span {
  margin-right: 3px;
}

.beian {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gxb {
  text-align: end;
  margin-right: 5px;
}

.gab {
  text-align: start;
  margin-left: 5px;
}
</style>