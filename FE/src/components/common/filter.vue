<template>
  <div>
    <ul>
      <li v-for="item in filterConf">
        <label>{{item.label}}：</label>
        <input type="text" :name="item.label" v-model="item.text">
      </li>
      <li>
        <button class="big-btn" @click="search">查询</button>
      </li>
    </ul>

  </div>
</template>

<script>
import API from '@/conf.js'
export default {
  // filterConf: [{label:'类别', value: 'categoryType'}]
  props: {
    filterConf: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    search() {
      let searchJson = {};
      this.filterConf.forEach(item => {
        if (item.text) {
          searchJson[item.value] = item.text;
        }
      })
      this.$emit('searchTable', searchJson);
    }
  }
}
</script>

<style lang="less" scoped>
ul{
  li{
    display: inline-block;
    height: 30px;
    width: 210px;
    float: left;
    margin: 10px 0;

    .big-btn{
      margin: 0 0 0 70px;
      float: left;
    }

    label {
      display: inline-block;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: right;
      font-size: 12px;
    }

    input{
      width: 136px;
      padding: 4px;
      box-sizing: border-box;
    }
  }
}
</style>