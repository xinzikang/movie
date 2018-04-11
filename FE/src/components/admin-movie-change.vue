<template>
  <div class="index">
     <div class="title-head">
       <p>后台编辑页</p>
     </div>
     <div class="main">
      <ul>
        <li>
          <label>译名：</label>
          <input type="text" v-model="CHITitle">
        </li>
        <li>
          <label>片名：</label>
          <input type="text" v-model="title">
        </li>
        <li>
          <label>年代：</label>
          <input type="text" v-model="year">
        </li>
        <br />
        <li>
          <label>产地：</label>
          <input type="text" v-model="country">
        </li>
        <li>
          <label>语言：</label>
          <input type="text" v-model="lang">
        </li>
        <li>
          <label>豆瓣评分：</label>
          <input type="text" v-model="doubanScore">
        </li>
        <br />
        <li>
           <label>类别：</label>
           <el-select v-model="categoryType" placeholder="请选择">
             <el-option
               v-for="item in categoryOptions"
               :key="item.type"
               :label="item.name"
               :value="item.type">
             </el-option>
           </el-select>
        </li>
        <li>
          <label>导演：</label>
          <input type="text" v-model="director">
        </li>
        <li>
          <label>海报地址：</label>
          <input type="text" v-model="poster">
        </li>
        <li>
          <label>简介：</label>
          <textarea resize="none" v-model="summary"></textarea>
        </li>
      </ul>
     </div>
     <input type="button" value="录入" @click="insert">
  </div>
</template>

<script>
import API from '@/conf.js'
export default {
  data () {
    return {
      CHITitle: '',
      title: '',
      director: '',
      country: '',
      lang: '',
      doubanScore: '',
      poster: '',
      year: '',
      summary: '',
      categoryOptions: [],
      categoryType: ''
    }
  },
  mounted() {
    const _id = this.$route.query.id;
    if (_id) {
      this.$axios.get(API.getMovieDetail + _id)
        .then(res => {
          if (!res.data.errNo) {
            const jsonData = res.data.data.movie;
            this.CHITitle = jsonData.CHITitle;
            this.title = jsonData.title;
            this.director = jsonData.director;
            this.country = jsonData.country;
            this.lang = jsonData.lang;
            this.poster = jsonData.poster;
            this.doubanScore = jsonData.doubanScore;
            this.year = jsonData.year;
            this.summary = jsonData.summary;
            this.categoryType = +jsonData.categoryType;
          }
        })
    }
    this.$axios.get(API.getCategoryList)
      .then(res => {
        if (!res.data.errNo) {
          this.categoryOptions = res.data.data;
        }
      })
  },
  methods: {
    insert() {
      this.$axios.post(API.changeMovieDetail,{
        CHITitle: this.CHITitle,
        title: this.title,
        director: this.director,
        lang: this.lang,
        doubanScore: this.doubanScore,
        country: this.country,
        poster: this.poster,
        year: this.year,
        summary: this.summary,
        _id: this.$route.query.id,
        categoryType: this.categoryType
      }).then( res => {
        if (!res.data.errNo) {
          this.$router.push('/content/admin/movie/list');
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
@gray: #989898;
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
textarea{
  width: 200px;
  resize: none;
  height: 160px;
  vertical-align: text-top;
  color: @gray;
  margin-bottom: 10px;
  border: 1px solid #d8dce5;
  border-radius: 4px;
}
ul{
  display: flex;
  flex-wrap: wrap;
  li{
      // flex: 1;
      width: 30%;
      margin-right: 10px;
  }
}
</style>
