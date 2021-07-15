<template>
<!-- /* eslint-disable */ -->
  <q-page padding>
    <h4 class="text-center">Vendedores</h4>
    <q-card class="my-card">
      <q-card-section class="bg-dark text-white">
        <div class="text-h6">CADASTRAR UM NOVO VENDEDOR</div>
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
          <q-btn label="Cadastrar" type="submit" color="primary"/>
          <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" @click="onReset"/>
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
    }
  },
  methods: {
    async getVendedores(){
      try {
        this.$q.loading.show()
        const query = await db.collection('vendedores').get();
        query.forEach(element => {
          let vendedor = {id: element.id, nome: element.data().nome, cpf: element.data().cpf}
          this.vendedors.push(vendedor);
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
        const query = await db.collection('vendedores').add({
          nome: this.vendedor.nome,
          cpf: this.vendedor.cpf
        })
        this.vendedores.push({
          nome: this.vendedor.nome,
          cpf: this.vendedor.cpf,
          id: query.id
        })

        this.onReset()

        this.$q.notify({
          message: 'Vendedor Cadastrado!',
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
      this.vendedor = {
        nome: '',
        cpf: null
      }
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