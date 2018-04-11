import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        movieIdForDetail: '',
        categoryName: ''
    },
    mutations: {
      saveMovieIdForInfo (state, payload) {
        sessionStorage.setItem('movieIdForDetail', payload.movieId);
        if(!state.movieIdForDetail) {
          state.movieIdForDetail = sessionStorage.getItem('movieIdForDetail');
        }
      },
      changeCategoryId(state, categoryName) {
        sessionStorage.setItem('categoryName', categoryName);
      }
    },
    actions: {
      // actions是异步修改state中的值，除此之外，与mutations没有区别
      getMovieForInfo({ state }) {
        state.movieIdForDetail = sessionStorage.getItem('movieIdForDetail');
      }
    }
})