<template>
<!-- /* eslint-disable */ -->
  <q-page>
    <h4 class="text-center q-ma-md">Produtos</h4>
    <q-card class="my-card" style="max-width: 100%">
      <q-card-section class="bg-orange-6 text-white">
        <div class="text-h5">{{titulo.card}}</div>
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
            <q-btn :label="titulo.card" type="submit" color="orange-10"/>
            <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" @click="onReset"/>
            <q-btn label="Excluir" color="red" flat class="q-ml-sm" @click="deleteProduto"/>
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
      @row-click="selecionarProduto"
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
      titulo: {
        card: 'Cadastrar um Novo Produto',
        btn: 'Cadastrar',
      }
    }
  },
  methods: {
    async getProdutos(){
      try {
        this.$q.loading.show()
        const query = await db.collection('produtos').get();
        this.produtos = []

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
        if(this.produto.id){
          await db.collection('produtos').doc(this.produto.id).update({
            nome: this.produto.nome,
            valor: this.produto.valor
          })
        }else{
          const query = await db.collection('produtos').add({
          nome: this.produto.nome,
          valor: this.produto.valor
        })
        }

        this.onReset()

        this.$q.notify({
          message: 'Ação realizada com sucesso!',
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
    selecionarProduto(evt, row){
      this.produto = {...row}
      this.titulo.card = "Editar Produto Selecionado"
      this.titulo.btn = "Salvar Alterações"
    },
    deleteProduto(){
      if(this.produto.id){
this.$q.dialog({
    title: 'ATENÇÃO!',
    message: 'Deseja remover o Produto?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      this.$q.loading.show()
      const query = await db.collection('produtos').doc(this.produto.id).delete()
      this.onReset()
    } catch (error) {
      this.$q.notify({
        message: error,
        color: 'red',
        textColor: 'white',
        icon: 'clear'
      })
    } finally {
      this.$q.loading.hide()
    }
    })
  }else{
     this.$q.notify({
      message: "Selecione um Produto!",
      color: 'red',
      textColor: 'white',
      icon: 'clear'
    })
  }
    },
    onReset(){
      this.produto = {
        nome: '',
        valor: null
      }
      this.titulo.card = "Cadastrar um Novo Produto"
      this.titulo.btn = "Cadastrar"

      this.getProdutos()
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
