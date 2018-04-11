<template>
  <div class="index">
     <div class="title-head">
       <p>后台录入</p>
     </div>
     <div class="main">
       <label>姓名</label>
       <input type="text" v-model="name">
       <br>
       <label>角色type</label>
       <el-select v-model="role" placeholder="请选择">
         <el-option
           v-for="item in roleOptions"
           :key="item.role"
           :label="item.value"
           :value="item.role">
         </el-option>
       </el-select>
       <br>

     </div>
     <input type="button" value="录入" @click="insert">
  </div>
</template>

<script>
import API from '@/conf.js'
export default {
  data () {
    return {
      name: '',
      roleOptions: [],
      role: '',
      _id: ''
    }
  },
  mounted() {
    this._id = this.$route.query.id;
    if (this._id) {
      this.$axios.get(API.detailUser + this._id)
        .then(res => {
          if (!res.data.errNo) {
            const data = res.data.data;
            this.roleOptions = data.roleAllType;
            this.name = data.userInfo.name;
            this.role = data.userInfo.role;
          }
        })
    }
  },
  methods: {
    insert() {
      this.$axios.post(API.changeUserDetail,{
        name: this.name,
        role: this.role,
        id: this._id
      }).then( res => {
        if (!res.data.errNo) {
          this.$router.push('/content/admin/user/list');
        }
      }).catch( err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
label{
  display: inline-block;
  width: 80px;
  text-align: right;
}
label{
  margin-bottom: 16px;
}
input[type='button'] {
  width: 80px;
}

</style>
