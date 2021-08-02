<template>
<!-- /* eslint-disable */ -->
  <q-page padding>
    <h4 class="text-center">Vendedores</h4>
    <q-card class="my-card">
      <q-card-section class="bg-dark text-white">
        <div class="text-h6">{{titulo.card}}</div>
      </q-card-section>

      <q-separator></q-separator>
       <q-form
      @submit="cadastrar"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="vendedor.nome"
        label="Nome do Vendedor *"
        hint="Nome do Vendedor"
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Por favor informe o nome do Vendedor']"
      />

      <q-input
        filled
        type="number"
        v-model="vendedor.cpf"
        label="CPF do Vendedor *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Informe um CPF.' ]"
      />

      <q-separator></q-separator>
      <div>
        <q-card-actions align="right">
          <q-btn :label="titulo.btn" type="submit" color="primary"/>
          <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" @click="onReset"/>
          <q-btn label="Excluir" color="red" flat class="q-ml-sm" @click="deleteVendedor"/>
        </q-card-actions>
      </div>
    </q-form>
    </q-card>
    <div class="q-pt-md">
    <q-table
      title="Vendedores Cadastrados"
      :rows="vendedores"
      :columns="filds"
      row-key="name"
      @row-click="selecionarVendedor"
    />
  </div>
  </q-page>
</template>

<script>
/* eslint-disable */
import { db } from "boot/firebase";

export default {
  name: 'Vendedores',
  data() {
    return {
      vendedor: {
        nome: '',
        cpf: null
      },
      vendedores: [],
      filds: [
        { name: 'nome', align: 'center', label: 'Nome do Vendedor', field: 'nome', sortable: true },
        { name: 'cpf', align: 'center', label: 'CPF', field: 'cpf', sortable: true },
      ],
      titulo: {
        card: 'Cadastrar um Novo Vendedor',
        btn: 'Cadastrar'
      }
    }
  },
  methods: {
    async getVendedores(){
      try {
        this.$q.loading.show()
        const query = await db.collection('vendedores').get();
        this.vendedores = []

        query.forEach(element => {
          let vendedor = {id: element.id, nome: element.data().nome, cpf: element.data().cpf}
          this.vendedores.push(vendedor);
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
        if(this.vendedor.id){
          await db.collection('vendedores').doc(this.vendedor.id).update({
            nome: this.vendedor.nome,
            cpf: this.vendedor.cpf
          })
        }else{
          const query = await db.collection('vendedores').add({
           nome: this.vendedor.nome,
            cpf: this.vendedor.cpf
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
    selecionarVendedor(evt, row){
      this.vendedor = {...row}
      this.titulo.card = "Editar vendedor Selecionado"
      this.titulo.btn = "Salvar Alterações"
    },
    deleteVendedor(){
      if(this.vendedor.id){
this.$q.dialog({
    title: 'ATENÇÃO!',
    message: 'Deseja remover o Vendedor?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      this.$q.loading.show()
      const query = await db.collection('vendedores').doc(this.vendedor.id).delete()
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
      message: "Selecione um Vendedor!",
      color: 'red',
      textColor: 'white',
      icon: 'clear'
    })
  }
    },
    onReset(){
      this.vendedor = {
        nome: '',
        cpf: null
      }
      this.titulo.card = "Cadastrar um Novo Vendedor"
      this.titulo.btn = "Cadastrar"

      this.getVendedores()
    }
  },
  created(){
    this.getVendedores();
  }
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 250px
}
</style>
