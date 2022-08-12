export default [
  {
    path: '/',
    redirect: '/home/personelcenter'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home'),
    children: [
      {
        path: 'personelcenter',
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
