<template>
  <div class="sign">
     <label>姓名：
        <input type="text" placeholder="姓名" v-model="name">
     </label>
     <br>
     <label>密码：
        <input type="text" placeholder="密码" v-model="password">
     </label>
     <br>
     <input type="button" value="登录" class="btn" @click="signin">
     <input type="button" value="注册" class="btn" @click="signup">

     <el-dialog
       title="提示"
       :visible.sync="dialogVisible"
       width="30%">
       <span>{{errTips}}</span>
       <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
       </span>
     </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: '',
      dialogVisible: false,
      errTips: 'dasf'
    }
  },
  methods: {
    signup() {
      this.$axios.post('/api/users/signup',{
          name: this.name,
          password: this.password
      }).then( (res) => {
        const data = res.data;
        if (data.errNo) {
          this.dialogVisible = true;
          this.errTips = data.errStr;
        } else {
          alert('注册成功')
        }
      })
    },
    signin() {
      this.$axios.post('/api/users/signin',{
          name: this.name,
          password: this.password
      }).then( (res) => {
        const data = res.data;
        console.log(data)
        if (data.errNo) {
          this.dialogVisible = true;
          this.errTips = data.errStr;
        } else {
          sessionStorage.setItem('isAdmin', data.data.isAdmin);
          this.$router.push('/content/movie/list')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style type="text/css" lang='less'>
  label{
    display: inherit;

    input{
      height: 24px;
    }
  }
  input{
    border: 1px solid #333;
    padding: 0 4px;
  }
  .btn{
    width: 80px;
    height: 30px;
  }
</style>