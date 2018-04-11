<template>
  <div>
    <div class="category-box">
      <ul>
        <li v-for="item in categoryList"
        @click="chooseCategory(item.type)"
        :class="{'active': activeCategory == item.type}">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="movie-box">
      <ul>
        <li v-for="(item,index) in movieList" :key="index">
          <img :src="item.poster" @click="goToDetail(item._id)">
          <p class="title">{{item.title}}</p>
          <p>{{item.year}}</p>
        </li>
      </ul>
    </div>
    <el-pagination
      background
      v-show="total"
      layout="prev, pager, next"
      :page-size="limit"
      @current-change="currentPageChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import API from '@/conf.js'
export default {
  data() {
    return {
      movieList: [],
      categoryList: [{name: '全部', type: 0}],
      activeCategory: 0,
      pn: 1,
      limit: 20,
      total: 0
    }
  },
  mounted() {
    this.$axios.get(API.getCategoryList)
      .then(res => {
        if (!res.errNo) {
          this.categoryList = this.categoryList.concat(res.data.data);
          sessionStorage.setItem('categoryList', JSON.stringify(this.categoryList));
        }
      })
    this.getListData();
  },
  methods: {
    getListData(filter) {
      this.$axios.get(API.getMovieList, {
        params: {
          pn: this.pn,
          limit: this.limit,
          searchJson: filter
        }
      })
        .then(res => {
          if(res.data.errNo === 0) {
            this.movieList = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
    },
    goToDetail(id) {
      this.$store.commit('saveMovieIdForInfo', {
        movieId: id
      });
      this.$router.push('/content/movie/detail')
    },
    chooseCategory(type) {
      this.activeCategory = type;
      if (type) {
        this.getListData({
          categoryType: this.activeCategory
        });
      }
      else {
        this.getListData();
      }

    },
    currentPageChange() {

    }
  }
}
</script>

<style lang="less" scoped>
.category-box{
  ul {
    text-align: left;
    li {
      display: inline-block;
      margin: 4px;
      border: 1px solid #333;
      border-radius: 2px;
      padding: 4px;
      cursor: pointer;
    }

    .active{
      background: blue;
      color: #fff;
    }
  }
}

.movie-box{
  ul{
    text-align: left;
    li{
      display: inline-block;
      width: 200px;
      margin-right: 10px;
      text-align: center;
      vertical-align: text-top;

      img {
        width: 200px;
        height: 250px;
        margin-bottom: 6px;
        cursor: pointer;
        border: 1px solid transparent;

        &:hover{
          border:1px solid red;
        }
      }

      .title{
        font-size: 16px;
        line-height: 20px;
        font-weight: bold;
      }

      p{
        font-size: 14px;
        line-height: 14px;
        color: #333;
      }
    }
  }
}
</style>