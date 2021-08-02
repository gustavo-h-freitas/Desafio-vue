
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'produtos', component: () => import('pages/Produtos.vue') },
      { path: 'vendedores', component: () => import('pages/Vendedores.vue') },
      { path: 'relatorios', component: () => import('pages/Relatorios.vue') },
      { path: 'loja', component: () => import('pages/Loja.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/auth/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Auth.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
