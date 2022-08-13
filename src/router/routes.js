export default [
  {
    path: '/',
    // redirect: '/home/usercenter'
    redirect: '/welcomepage02'
  },
  {
    path: '/welcomepage02',
    component: () => import('@/views/Welcome/page02.vue')
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/views/Welcome')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home'),
    children: [
      {
        path: 'usercenter',
        name: 'usercenter',
        component: () => import('@/views/PersonelCenter')
      },
      {
        path: 'homeview',
        name: 'homeview',
        component: () => import('@/views/HomeView')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }
]
