export default [
  {
    path: '/',
    redirect: '/welcomepage02'
  },
  // ^ --- 配置欢迎页面01
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/views/Welcome')
  },
  // ^ --- 配置欢迎页面02
  {
    path: '/welcomepage02',
    component: () => import('@/views/Welcome/page02.vue')
  },
  // ^ --- 配置主页底部按钮模块
  {
    path: '/home',
    name: 'home',
    redirect: '/home/homeview',
    component: () => import('@/views/Home'),
    children: [
      // ^ --- 配置个人中心页面
      {
        path: 'usercenter',
        name: 'usercenter',
        component: () => import('@/views/PersonelCenter')
      },
      // ^ --- 配置主页频道浏览页面
      {
        path: 'homeview',
        name: 'homeview',
        component: () => import('@/views/HomeView')
      }
    ]
  },
  // ^ --- 配置登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  // ^ --- 配置搜索页面
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  },
  // ^ --- 配置文章详情页面
  {
    path: '/article/:articleId',
    name: 'article',
    props: true,
    component: () => import('@/views/Article')
  }
]
