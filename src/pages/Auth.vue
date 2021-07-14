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
              <q-input square filled clearable v-model="cpf" type="cpf" label="CPF" @click="logar" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" />
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      cpf: ''
    }
  },
  methods: {
    logar () {
      console.log('Teste')
    }
  }
}
</script>

<style scoped>
.conteiner {
  background: url('assets/img/auth/bg.jpg') no-repeat center #eeecef70;/* #ccc cover center;*/
}

.q-card {
  width: 100%;
  max-width: 400px;
}
</style>
