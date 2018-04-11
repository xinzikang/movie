<template>
  <div>
    <div class="filter-box">
      <filter-comp :filterConf="filterConf" @searchTable="filterTableData($event)"></filter-comp>
      <a href="javascript:;" @click="goTo(0)" class="big-btn">添加新电影</a>
    </div>
    <div class="main">
     <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        v-for="(item,index) in tableConf"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        >
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <a href="javascript:;" @click="goTo(scope.row._id)" class="editBtn">编辑</a>
          <a href="javascript:;" @click="remove(scope.row._id)" class="deleteBtn">删除</a>
        </template>
      </el-table-column>
     </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="limit"
      v-show="total"
      @current-change="currentPageChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import API from '@/conf.js'
import filterComp from './common/filter'
export default {
  data () {
    return {
      tableData: [],
      filterConf: [
        {
          label: '译名',
          value: 'CHITitle',
          text: ''
        },
        {
          label: '片名',
          value: 'title',
          text: ''
        },
        {
          label: '年代',
          value: 'year',
          text: ''
        },
        {
          label: '语言',
          value: 'lang',
          text: ''
        },
        {
          label: '类别',
          value: 'categoryText',
          text: ''
        },
        {
          label: '产地',
          value: 'country',
          text: ''
        }
      ],
      categoryList: JSON.parse(sessionStorage.getItem('categoryList')),
      tableConf: [
        {
          prop: 'CHITitle',
          label: '译名'
        },
        {
          prop: 'title',
          label: '片名'
        },
        {
          prop: 'year',
          label: '年代'
        },
        {
          prop: 'country',
          label: '产地'
        },
        {
          prop: 'categoryText',
          label: '类别'
        },
        {
          prop: 'lang',
          label: '语言'
        },
        {
          prop: 'doubanScore',
          label: '豆瓣评分'
        },
        {
          prop: 'director',
          label: '导演'
        }
      ],
      pn: 1,
      limit: 5,
      total: 0
    }
  },
  components: {
    filterComp
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$axios.get(API.getMovieList, {
        params: {
          pn: this.pn,
          limit: this.limit
        }
      })
        .then(res => {
          if (!res.data.errNo) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            this.tableData.forEach(item => {
              let _categoryType = '';
              for (var i =0; i < this.categoryList.length; i++) {
                if (+item.categoryType === this.categoryList[i].type) {
                  _categoryType = this.categoryList[i].name;
                  break;
                }
              }
              item.categoryText = _categoryType;
            })
          }
        })
    },
    filterTableData(searchJson) {
      this.$axios.get(API.getMovieList, {
        params: {
          searchJson,
          pn: 1,
          limit: this.limit
        }
      })
        .then(res => {
          if (!res.data.errNo) {
            this.tableData = res.data.data;
          }
        })
        .catch(err => {
          console.log('searchMovie err:', err);
        })
    },
    remove(id) {
      this.$axios.delete(API.deleteMovie + id)
        .then(res => {
          if (!res.data.errNo) {
            this.$router.go(0);
          }
        })
    },
    goTo(id) {
      this.$router.push('/content/admin/movie/add?id=' + id);
    },
    detail() {

    },
    currentPageChange(pn) {
      this.pn = pn;
      this.getTableData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@blueBg: #409EFF;
label{
  display: inline-block;
  width: 80px;
  text-align: right;
}
input{
  margin-top: 10px;
}
input[type='button'] {
  width: 80px;
}
.filter-box {
  overflow: hidden;
  .big-btn{
    float: left;
    margin-left: 70px;
  }
}
.main{
  margin-bottom: 20px;
}
.editBtn{
  color: @blueBg;
}
.deleteBtn{
  color: red;
}
</style>
