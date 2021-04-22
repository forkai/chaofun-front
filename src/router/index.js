import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
// console.log('storestorestore',store)
import * as api from '../api/api'
Vue.use(Router)


/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const visRoute = []
// const visRoute = [
//   {
//     path: '/webview/contact',
//     component: () => import('@/views/webview/contact'),
//     name: 'contact',
//     meta: { title: '联系我们&意见反馈'},
//     hidden: true
//   },
//   {
//     path: '/webview/buttonGame',
//     component: () => import('@/views/webview/buttonGame'),
//     name: 'buttonGame',
//     meta: { title: 'buttonGame'},
//     hidden: true
//   },
//   {
//     path: '/webview/forum/seting',
//     component: () => import('@/views/webview/forum/seting'),
//     name: 'forumseting',
//     meta: { title: 'forumseting'},
//     hidden: true
//   },
//   {
//     path: '/webview/activity/index',
//     component: () => import('@/views/webview/activity/index'),
//     name: 'activityindex',
//     meta: { title: 'activityindex'},
//     hidden: true
//   },
//   {
//     path: '/webview/buttonGame/rank',
//     component: () => import('@/views/webview/buttonGame/rank'),
//     name: 'rank',
//     meta: { title: 'rank'},
//     hidden: true
//   },
//   {
//     path: '/webview/secret',
//     component: () => import('@/views/webview/secret/index'),
//     name: 'webViewSecret',
//     meta: { title: 'secret'},
//     hidden: true
//   },
// ]
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/down_test',
    component: () => import('@/views/app/down'),
    hidden: true
  },
  {
    path: '/app',
    component: () => import('@/views/app/downs'),
    hidden: true
  },
  
  {
    path: '/',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true },
        hidden: true
      },
      {
        path: '/middles',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true },
        hidden: true
      },
      {
        path: '/trends',
        component: () => import('@/views/list/attention'),
        name: 'Dashboard',
        meta: { title: '关注', icon: 'dashboard', affix: true },
        hidden: true
      },
      {
        path: '/p/:postId',
        component: () => import('@/views/list/articleDetail'),
        name: 'articleDetail',
        meta: { title: '', icon: 'dashboard', affix: true },
        hidden: true
      },
      {
        path: '/submit',
        name: 'submit',
        component: () => import('@/views/submit/submit'),
        hidden: true
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/list/my'),
        hidden: true
      },
      {
        path: '/secret',
        name: 'secret',
        component: () => import('@/views/secret/secret'),
        hidden: true
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/list/search'),
        hidden: true
      },
      {
        path: '/f/:forumId',
        component: () => import('@/views/list/home'),
        name: '/f/1',
        meta: { title: ''},
        hidden: true
      },
      {
        path: '/user/:id',
        component: () => import('@/views/list/user'),
        name: 'userhome',
        meta: { title: ''},
        hidden: true
      },
      {
        path: '/setting',
        component: () => import('@/views/list/setting'),
        name: 'setting',
        meta: { title: '设置'},
        hidden: true
      },
      {
        path: '/f/:id/setting',
        component: () => import('@/views/list/forumSetting'),
        name: 'forumSetting',
        meta: { title: '板块设置'},
        hidden: true
      },
      {
        path: '/submitH5',
        component: () => import('@/views/h5/submit'),
        name: 'submitH5',
        meta: { title: '设置'},
        hidden: true
      },
      {
        path: '/board',
        component: () => import('@/views/dashboard/board'),
        name: 'board',
        meta: { title: '设置'},
        hidden: true
      },
      {
        path: '/gamePage',
        component: () => import('@/views/game/gamePage'),
        name: 'gamePage',
        meta: { title: '设置'},
        hidden: true
      },
      {
        path: '/message',
        component: () => import('@/views/users/message'),
        name: 'message',
        meta: { title: '我的消息'},
        hidden: true
      },
      {
        path: '/h5forward',
        component: () => import('@/components/h5/forward'),
        name: 'h5forward',
        meta: { title: '转发'},
        hidden: true
      },
      {
        path: '/lists',
        component: () => import('@/views/list/lists'),
        name: 'lists',
        meta: { title: '全部板块'},
        hidden: true
      },
      {
        path: '/manager',
        component: () => import('@/views/manager/manager'),
        name: 'manager',
        meta: { title: '管理'},
        hidden: true
      },
      // ...store.state.permission.routes,
      // {
      //   path: '/f/2',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/2',
      //   meta: { title: '全网热门'},
      //   hidden: true
      // },
      // {
      //   path: '/f/3',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/3',
      //   meta: { title: 'Reddit'},
      //   hidden: true
      // },
      // {
      //   path: '/f/4',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/4',
      //   meta: { title: 'HackerNews中文'},
      //   hidden: true
      // },
      // {
      //   path: '/f/5',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/5',
      //   meta: { title: '游戏'},
      //   hidden: true
      // },
      // {
      //   path: '/f/6',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/6',
      //   meta: { title: '风景'},
      //   hidden: true
      // },
      // {
      //   path: '/f/7',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/7',
      //   meta: { title: '体育'},
      //   hidden: true
      // },
      // {
      //   path: '/f/8',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/8',
      //   meta: { title: '艺术'},
      //   hidden: true
      // },
      // {
      //   path: '/f/9',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/9',
      //   meta: { title: '萌宠'},
      //   hidden: true
      // },
      // {
      //   path: '/f/10',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/10',
      //   meta: { title: '二次元'},
      //   hidden: true
      // },
      // {
      //   path: '/f/11',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/11',
      //   meta: { title: '老照片'},
      //   hidden: true
      // },
      // {
      //   path: '/f/12',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/12',
      //   meta: { title: '星尘大海'},
      //   hidden: true
      // },
      // {
      //   path: '/f/13',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/13',
      //   meta: { title: '新闻'},
      //   hidden: true
      // },
      // {
      //   path: '/f/14',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/14',
      //   meta: { title: '极客'},
      //   hidden: true
      // },
      // {
      //   path: '/f/15',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/15',
      //   meta: { title: '电影'},
      //   hidden: true
      // },
      // {
      //   path: '/f/16',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/16',
      //   meta: { title: '炒饭发布'},
      //   hidden: true
      // },
      // {
      //   path: '/f/17',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/17',
      //   meta: { title: 'AB站'},
      //   hidden: true
      // },
      // {
      //   path: '/f/18',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/18',
      //   meta: { title: '科技'},
      //   hidden: true
      // },
      // {
      //   path: '/f/19',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/19',
      //   meta: { title: 'Linux'},
      //   hidden: true
      // },
      // {
      //   path: '/f/20',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/20',
      //   meta: { title: '财经'},
      //   hidden: true
      // },
      // {
      //   path: '/f/21',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/21',
      //   meta: { title: '滑稽'},
      //   hidden: true
      // },
      // {
      //   path: '/f/22',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/22',
      //   meta: { title: '炒饭日常'},
      //   hidden: true
      // },
      // {
      //   path: '/f/23',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/23',
      //   meta: { title: ''},
      //   hidden: true
      // },
      // {
      //   path: '/f/24',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/24',
      //   meta: { title: ''},
      //   hidden: true
      // },
      // {
      //   path: '/f/25',
      //   component: () => import('@/views/list/home'),
      //   name: '/f/25',
      //   meta: { title: ''},
      //   hidden: true
      // },

      {
        path: '/all',
        component: () => import('@/views/dashboard/index'),
        name: '/all',
        meta: { title: '全站'},
        hidden: true
      },
      {
        path: '/recommend',
        component: () => import('@/views/dashboard/index'),
        name: '/recommend',
        meta: { title: '推荐'},
        hidden: true
      },
      { path: '*', redirect: '/404', hidden: true }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// export const asyncRoutes = [
const asyncRoutesTest = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [

]
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...visRoute,...constantRoutes],
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
