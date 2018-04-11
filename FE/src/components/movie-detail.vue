<template>
  <div>
    <div class="movieDetailBox">
      <img :src="movieInfo.poster">
      <div class="movie-info">
        <p>译名:<span>{{movieInfo.CHITitle}}</span></p>
        <p>片名:<span>{{movieInfo.title}}</span></p>
        <p>年代:<span>{{movieInfo.year}}</span></p>
        <p>产地:<span>{{movieInfo.country}}</span></p>
        <p>类别:<span>{{movieInfo.category}}</span></p>
        <p>语言:<span>{{movieInfo.lang}}</span></p>
        <p>豆瓣评分:<span>{{movieInfo.doubanScore}}</span></p>
        <p>导演:<span>{{movieInfo.director}}</span></p>
        <p>简介:<span>{{movieInfo.summary}}</span></p>
      </div>
    </div>
    <div class="comment">
      <ul>
        <li v-for="item in commentData">
          <img src="../assets/avatar.png" @click="changeToUser(item.from.name, item._id, item.isReply)">
          <div class="text">
            <p class="name">{{item.from.name}}</p>
            <p class="content">{{item.comment}}</p>
          </div>
          <ul>
            <li v-for="reply in item.reply">
              <img src="../assets/avatar.png" @click="changeToUser(reply.from.name, item._id)">
              <div class="text">
                <p class="name">{{reply.from.name}} 回复 {{item.from.name}}</p>
                <p class="content">{{reply.comment}}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <p v-if="hasToUser">回复 {{toUser}}</p>
      <p v-else>发表评论</p>
      <textarea  v-model="postCommentText"></textarea>
      <br>
      <button @click="save">提交评论</button>
      <button @click="cancelComment" class="cancel-btn">{{cancelText}}</button>
    </div>
  </div>
</template>

<script>
  const API = require('@/conf.js');
  const { getMovieDetail, postCommentApi } = API;
  export default {
    vuex: {
      //获取vuex状态数据
      getters: {
        id: state => state.movieIdForDetail,
      },
      //状态变更事件
      actions: {
      }
    },
    data() {
      return {
        movieInfo: {},
        commentData: [],
        moveiUpdata: '',
        postCommentText: '',
        // toUser有值表示是回复的评论
        toUser: '',
        // 被回复评论的ID
        commentId: '',
        cancelText: '取消',
        hasToUser: false
      }
    },
    mounted() {
      this.$store.dispatch('getMovieForInfo')
      this.$axios.get(getMovieDetail + this.$store.state.movieIdForDetail)
        .then(res => {
          if (!res.errNo) {
            this.movieInfo = res.data.data.movie;
            this.commentData = res.data.data.comment;
            this.commentData.forEach(item => {
              item.isReply = false;
              item.reply.forEach(reply => {
                reply.isReply = false;
              })
            })
            this.moveiUpdata = this.movieInfo.meta.updateAt;
             console.log('movieInfo:',this.movieInfo)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      changeToUser(userName, commentId, isReply) {
        this.hasToUser = true;
        this.commentId = commentId;
        this.toUser = userName;
        this.cancelText = '取消评论';
      },
      cancelComment() {
        this.hasToUser = false;
        this.commentId = '';
        this.toUser = '';
        if (this.cancelText === '取消评论') {
          this.cancelText = '取消';
        }
        this.postCommentText = '';
      },
      save() {
        let postCommentContent = {
          comment: this.postCommentText,
          movie: this.$store.state.movieIdForDetail
        };
        if(this.toUser) {
          Object.assign(postCommentContent, {
            to: this.toUser,
            commentId: this.commentId
          })
        }
        this.$axios.post(postCommentApi, postCommentContent,{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if(!res.data.errNo) {
            this.$router.go(0);
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.movieDetailBox{
  text-align: left;

  img{
    height: 300px;
  }

  .movie-info{
    display: inline-block;
    text-align: left;
    max-width: 610px;

    p{
      font-size: 14px;
      line-height: 20px;

      span{
        font-weight: bold;
        margin-left: 4px;
      }
    }
  }
}

.comment{
  margin-top: 10px;
  li {
    border-bottom: 1px solid #cecece;
    margin-bottom: 8px;
    margin-right: auto;
    margin-left: auto;
    padding-bottom: 4px;
    text-align: left;
    img{
      height: 30px;
      width: 30px;
      margin-right: 10px;
    }

    .text{
      display: inline-block;

      .name{
        font-size: 12px;
        font-weight: bold;
      }

      .content{
        font-size: 14px;
        margin-top: 4px;
      }
    }

    li{
      margin-top: 8px;
      width: 90%;

    }

    li:last-child{
      border-bottom: 0px;
    }
  }

  >p{
    text-align: left;
  }

  textarea{
    resize: none;
    height: 80px;
    width: 100%;
    margin-top: 10px;
  }
}

</style>