<template>
  <q-page class="flex flex-center conteiner">
     <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h5 text-center">SIG Vendas</div>
      </q-card-section>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="cpf" type="cpf" label="CPF" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-9" size="lg" class="full-width" label="Login"  @click="logar()"/>
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script>
/* eslint-disable */
import { db } from "boot/firebase";

export default {
  name: 'Auth',
  data () {
    return {
      cpf: ''
    }
  },
  methods: {
    async logar () {
      try {
        this.$q.loading.show()
        const query = await db.collection('vendedores').get();

        query.forEach(element => {
          let vendedor = {id: element.id, nome: element.data().nome, cpf: element.data().cpf}
          if(this.cpf == vendedor.cpf){
            this.$router.push('/dashboard')
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.$q.loading.hide()
      }
    },
  }
}
</script>

<style scoped>
.conteiner {
  background: url('assets/img/auth/doutor.png') no-repeat left #eeecef70;/* #ccc cover center;*/
}

.q-card {
  width: 100%;
  max-width: 400px;
}
</style>
