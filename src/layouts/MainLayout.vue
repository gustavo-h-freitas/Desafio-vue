<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <div>SIG VENDAS v0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-white-8"
        >
          SISTEMA ADMINISTRATIVO
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Dashboard',
    caption: 'Tela de início',
    icon: 'home',
    link: '/dashboard'
  },
  {
    title: 'Produtos',
    caption: 'Cadastro, edição e exclusão',
    icon: 'add_box',
    link: '/dashboard/produtos'
  },
  {
    title: 'Vendedores',
    caption: 'Cadastro, edição e exclusão',
    icon: 'group',
    link: '/dashboard/vendedores'
  },
  {
    title: 'Relatórios',
    caption: '',
    icon: 'pie_chart',
    link: '/dashboard/relatorios'
  },
  {
    title: 'Loja',
    caption: 'Local para vendas',
    icon: 'store_mall_directory',
    link: '/dashboard/loja'
  },
  {
    title: 'Logout',
    caption: 'No momento redireciona para a tela que seria de Login*',
    icon: 'arrow_back',
    link: '/'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
