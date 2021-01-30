import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: '图书管理',
    component: Index,
    redirect: '/BookManage',
    show: true,
    children: [
      {
        path: '/BookManage',
        name: '查询图书',
        component:  () => import('../components/BookManage')
      },
      {
        path: '/AddBook',
        name: '添加图书',
        component: () => import('../components/AddBook')
      },

    ],

  },
  {
    path: '/BookUpdate',
    name: '修改图书',
    show: false,
    component: () => import('../components/BookUpdate')
  }


]
// 3.创建路由对象
const router = new VueRouter({
  mode: 'history',
  routes
})

// 4.导出
export default router
