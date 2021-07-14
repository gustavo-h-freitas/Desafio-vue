
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'produtos', component: () => import('pages/Produtos.vue') },
      { path: 'vendedores', component: () => import('pages/Vendedores.vue') },
      { path: 'relatorios', component: () => import('pages/Relatorios.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/auth/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Auth.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
