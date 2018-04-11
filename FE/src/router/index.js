import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout'
import Sign from '@/pages/sign'

import AdminMovieChange from '@/components/admin-movie-change'
import MovieList from '@/components/movie-list'
import MovieDetail from '@/components/movie-detail'
import AdminMovieList from '@/components/admin-movie-list'
import AdminUserList from '@/components/admin-user-list'
import AdminUserDetail from '@/components/admin-user-change'
import CategoryList from '@/components/category-list'
import CategoryChange from '@/components/category-change'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/content',
      component: Layout,
      children: [
        {
          path:'/',
          component: MovieList
        },
        {
          path: 'admin/movie/list',
          component: AdminMovieList
        },
        {
          path: 'admin/movie/add',
          component: AdminMovieChange
        },
        {
          path:'movie/list',
          component: MovieList
        },
        {
          path: 'movie/detail',
          component: MovieDetail
        },
        {
          path: 'admin/category/list',
          component: CategoryList
        },
        {
          path: 'admin/category/change',
          component: CategoryChange
        },
        {
          path: 'admin/user/list',
          component: AdminUserList
        },
        {
          path: 'admin/user/detail',
          component: AdminUserDetail
        }
      ]
    },
    {
      path: '/',
      component: Sign
    },
    {
      path: '/sign',
      component: Sign
    }
  ]
})
