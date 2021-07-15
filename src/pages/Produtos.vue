<template>
<!-- /* eslint-disable */ -->
  <q-page padding>
    <h4 class="text-center">Produtos</h4>
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">CADASTRAR UM NOVO PRODUTO</div>
      </q-card-section>

      <q-separator></q-separator>
       <q-form
      @submit="cadastrar"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="produto.nome"
        label="Nome do Produto *"
        hint="Nome do Produto"
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Por favor informe o nome do Produto']"
      />

      <q-input
        filled
        type="number"
        v-model="produto.valor"
        label="Preço do Produto *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Infoeme um Preço.',
          val => val > 0 && val < 1000000 || 'Informe um valor válido!'
        ]"
      />

      <q-separator></q-separator>
      <div>
        <q-card-actions align="right">
          <q-btn label="Cadastrar" type="submit" color="primary"/>
          <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" @click="onReset"/>
        </q-card-actions>
      </div>
    </q-form>
    </q-card>

    <div class="q-pt-md">
    <q-table
      title="Produtos Cadastrados"
      :rows="produtos"
      :columns="filds"
      row-key="name"
    />
  </div>
  </q-page>
</template>

<script>
/* eslint-disable */
import { db } from "boot/firebase";

export default {
  name: 'Produtos',
  data() {
    return {
      produto: {
        nome: '',
        valor: null
      },
      produtos: [],
      filds: [
        { name: 'nome', align: 'center', label: 'Produto', field: 'nome', sortable: true },
        { name: 'valor', align: 'center', label: 'Valor', field: 'valor', sortable: true },
      ],
    }
  },
  methods: {
    async getProdutos(){
      try {
        this.$q.loading.show()
        const query = await db.collection('produtos').get();
        query.forEach(element => {
          let produto = {id: element.id, nome: element.data().nome, valor: element.data().valor}
          this.produtos.push(produto);
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.$q.loading.hide()
      }
    },
    async cadastrar () {
      try {
        this.$q.loading.show()
        const query = await db.collection('produtos').add({
          nome: this.produto.nome,
          valor: this.produto.valor
        })
        this.produtos.push({
          nome: this.produto.nome,
          valor: this.produto.valor,
          id: query.id
        })

        this.onReset()

        this.$q.notify({
          message: 'Produto Cadastrado!',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
        })
      } catch (err) {
        this.$q.notify({
          message: err,
          color: 'red',
          textColor: 'white',
          icon: 'clear'
        })
      } finally {
        this.$q.loading.hide()
      }
    },
    onReset(){
      this.produto = {
        nome: '',
        valor: null
      }
    }
  },
  created(){
    this.getProdutos();
  }
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 250px
}
</style>