export default [
  {
    path: '/',
    redirect: '/home/usercenter'
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
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }
]
