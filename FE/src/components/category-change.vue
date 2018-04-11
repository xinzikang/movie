<template>
  <div>
    <ul>
      <li>
        <label for="categoryName">分类名称：</label>
        <input type="text" name="categoryName" v-model="categoryName">
      </li>
      <li>
        <label for="categoryType">分类ID：</label>
        <input type="text" name="categoryType" v-model="categoryType">
      </li>
    </ul>
    <input type="button" value="确定" @click="save">
    <input type="button" value="返回" class="cancel-btn" @click="goBack">
  </div>
</template>

<script>
import API from '@/conf.js';
export default {
  data() {
    return {
      categoryName: '',
      categoryType: '',
      // 0:添加 1：编辑
      changeType: '',
      categoryList: [{name: '全部', type: 0}]
    }
  },
  mounted() {
    this.changeType = this.$route.query.changeType;
    if (+this.changeType) {
      this.$axios.get(API.categoryInfo, {
        params: {
          name: sessionStorage.getItem('categoryName')
        }
      })
        .then(res => {
          if(res.data.errNo === 0) {
            this.categoryName = res.data.data.name;
            this.categoryType = res.data.data.type;
          }
        })
    }
  },
  methods: {
    save() {
      this.$axios.post(API.changeCategory, {
        changeType: this.changeType,
        name: this.categoryName,
        type: this.categoryType
      })
        .then(res => {
          this.$axios.get(API.getCategoryList)
            .then(res => {
              if (!res.errNo) {
                this.categoryList = this.categoryList.concat(res.data.data);
                sessionStorage.setItem('categoryList', JSON.stringify(this.categoryList));
                this.$router.push('/content/admin/category/list');
              }
            })
        })
        .catch(err => {
          console.log("change categoty err:", err);
        })
    },
    goBack() {
      this.$router.push('/content/admin/category/list');
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  li {
    margin-bottom: 6px;
    label{
      width: 100px;
      display: inline-block;
      text-align: right;
    }
    input{
      color: #909090;
      padding-left: 4px;
      height: 20px;
    }
  }
}

</style>