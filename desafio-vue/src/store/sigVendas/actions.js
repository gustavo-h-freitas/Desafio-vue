/* eslint-disable */
import { db } from "boot/firebase";

const setProdutos = ({ commit }) => {
    try {
        const query = db.collection('produtos').get();
        let produtos = []

        query.then(resp => {
            console.log(resp)
            resp.forEach(element => {
                let produto = {id: element.id, nome: element.data().nome, valor: element.data().valor}
                produtos.push(produto);
                });
        })

        commit('SETPRODUTOS', produtos)
    } catch (err) {
        console.log(err);
    } finally {
    }
}

const setVendedores = ({ commit }) => {
    try {
        const query = db.collection('vendedores').get();
        let vendedores = []

        query.forEach(element => {
        let vendedor = {id: element.id, nome: element.data().nome, cpf: element.data().cpf}
        vendedores.push(produto);
        });

        commit('SETVENDEDORES', vendedores)
    } catch (err) {
        console.log(err);
    } finally {
    }
}

const setUsuario = ({ commit }) => {
    try {
        const query = db.collection('vendedores').get();

        query.forEach(element => {
        let vendedor = {id: element.id, nome: element.data().nome, cpf: element.data().cpf}
        if(this.cpf == vendedor.cpf){
            commit('SETUSUARIO', vendedor)
          }
        });
    } catch (err) {
        console.log(err);
    } finally {
    }
}

export {
    setProdutos,
    setVendedores,
    setUsuario
}
