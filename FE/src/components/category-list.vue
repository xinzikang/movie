<template>
  <div>
    <div class="addBtn">
      <button @click="goto(0)">添加类别</button>
    </div>
    <div class="table-box">
      <el-table
         :data="categoryList"
         width="110%"
         border>
         <el-table-column
           prop="name"
           label="类别名称">
         </el-table-column>
         <el-table-column
           prop="meta.updateAt"
           label="录入时间">
         </el-table-column>
         <el-table-column
           prop="type"
           label="类别ID">
         </el-table-column>
         <el-table-column
           label="操作">
           <template slot-scope="scope">
             <el-button @click="deleteRow(scope.row._id)" size="small">删除</el-button>
             <el-button size="small" @click="goto(1, scope.row.name)">编辑</el-button>
           </template>
         </el-table-column>
       </el-table>
    </div>

  </div>
</template>

<script>
import API from '@/conf.js';
import { mapState,mapMutations } from 'vuex';
export default {
  data() {
    return {
      categoryList: []
    }
  },
  mounted() {
    this.$axios.get(API.getCategoryList)
      .then(res => {
        console.log(res);
        if(res.data.errNo === 0) {
          this.categoryList = res.data.data;
        }
      })
  },
  methods: {
    ...mapMutations([
      'changeCategoryId'
    ]),
    goto(changeType, categoryName) {
      if (categoryName) {
        this.changeCategoryId(categoryName);
      }
      this.$router.push('/content/admin/category/change?changeType=' + changeType);
    },
    deleteRow(id) {

    }
  }
}
</script>

<style lang="less" scoped>
.table-box{
  text-align: center;
}
.addBtn{
  text-align: left;
  margin: 10px 0;
}
</style>