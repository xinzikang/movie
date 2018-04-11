<template>
  <div class="layout">
    <header>
      <span class="logo">-- 小系统 --</span>
      <a @click="signout" href="javascript:;" style="margin: 0 20px;">退出</a>
      <a @click="goTo('/content/movie/list')" href="javascript:;" style="margin: 0 0 0 20px;">首页</a>
      <div
      v-if="isAdmin"
      class="adminBox"
      @mouseover="showAdmin"
      @mouseout="hideAdmin">
        <a href="javascript:;"
        class="adminBtn">
          后台系统
        </a>
        <div class="adminSub" v-show="showAdminBox">
          <p href="javascript:;" @click="goTo('/content/admin/movie/list')">电影列表页</p>
          <p href="javascript:;" @click="goTo('/content/admin/category/list')">分类列表页</p>
          <p href="javascript:;" @click="goTo('/content/admin/user/list')">用户表页</p>
        </div>
      </div>
    </header>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: '',
      showAdminBox: false,
      isAdmin: sessionStorage.getItem('isAdmin') === 'true'
    }
  },
  methods: {
    signout() {
      this.$axios.get('/api/users/signout')
        .then( (res) => {
          if (!res.data.errNo) {
            this.$router.push('/sign')
          }
        })
    },
    showAdmin() {
      this.showAdminBox = true;
    },
    hideAdmin() {
      this.showAdminBox = false;
    },
    goTo(url) {
      this.$router.push(url);
    }
  }
}
</script>

<style lang="less" scoped>
@gray: #9c9c9c;
@blueBg: #409EFF;
header{
  margin-bottom: 10px;

  .logo{
    font-size: 20px;
    font-weight: bold;
  }

  a{
    font-size: 12px;
    border:1px solid @gray;
    color: @gray;
    padding: 2px 4px;
    float: right;
    position: relative;
  }
  .hide{
    display: none;
  }
  .adminBox{
    position: relative;
    float: right;
    .adminSub{
      z-index: 1000;
      background: #fff;
      position: absolute;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      width: 70px;
      border: 1px solid @gray;
      font-size: 12px;
      color: @gray;

      p{
        line-height: 2;
        padding: 4px;

        &:hover{
          background-color: @blueBg;
          color: #fff;
        }
      }
    }
  }
}

.content {
  padding: 0 20px;
}
</style>