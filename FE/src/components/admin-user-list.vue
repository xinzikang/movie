<template>
  <div>
    <div>
      <filter-comp :filterConf="filterConf" @searchTable="filterTableData($event)"></filter-comp>
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
          label: '姓名',
          value: 'name',
          text: ''
        },
        {
          label: '角色type',
          value: 'role',
          text: ''
        }
      ],
      userTypeList: '',
      tableConf: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'roleText',
          label: '角色'
        },
        {
          prop: 'role',
          label: '角色type'
        },
        {
          prop: 'meta.updateAt',
          label: '更新时间'
        }
      ],
      pn: 1,
      limit: 10,
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
    getTableData(searchJson) {
      this.$axios.get(API.geUserList, {
        params: {
          pn: this.pn,
          limit: this.limit,
          searchJson: searchJson
        }
      })
        .then(res => {
          if (!res.data.errNo) {
            this.tableData = res.data.data.list;
            this.userTypeList = res.data.data.userTypeList;
            this.total = res.data.data.total;
            this.tableData.forEach(item => {
              let roleText = '';
              for (var i =0; i < this.userTypeList.length; i++) {
                if (+item.role === this.userTypeList[i].role) {
                  roleText = this.userTypeList[i].value;
                  break;
                }
              }
              item.roleText = roleText;
            })
          }
        })
    },
    filterTableData(searchJson) {
      this.pn = 1;
      this.getTableData(searchJson);
    },
    remove(id) {
      this.$axios.delete(API.deleteUser + id)
        .then(res => {
          if (!res.data.errNo) {
            this.$router.go(0);
          }
        })
    },
    goTo(id) {
      this.$router.push('/content/admin/user/detail?id=' + id);
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
.title {
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
