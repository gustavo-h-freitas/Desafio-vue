<template>
<!-- /* eslint-disable */ -->
  <q-page padding>
    <h4 class="text-center">Loja</h4>
    <h6 class="text-center">Seja bem-vindo(a),</h6>
    <div class="q-pt-md">
    <q-table
      title="Produtos Disponíveis"
      :rows="produtos"
      :columns="filds"
      row-key="name"
      @row-click="selecionarProduto"
    />
  </div>
  </q-page>
</template>

<script>
/* eslint-disable */
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Produtos',
  data() {
    return {
      produto: {
        nome: '',
        valor: null
      },
      filds: [
        { name: 'nome', align: 'center', label: 'Produto', field: 'nome', sortable: true },
        { name: 'valor', align: 'center', label: 'Valor', field: 'valor', sortable: true },
      ],
    }
  },
  computed: {
    ...mapState('sigVendas', ['produtos'])
  },
  methods: {
    ...mapActions('sigVendas', ['setProdutos']),

    selecionarProduto(evt, row){
      this.produto = {...row}
    },
  },
  created(){
    this.setProdutos()
  }
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 250px
}
</style>
