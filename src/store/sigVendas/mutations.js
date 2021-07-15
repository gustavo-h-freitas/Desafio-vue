/* eslint-disable */
const SETPRODUTOS = (state, payload) => {
    state.produtos = payload
}
const SETVENDEDORES = (state, payload) => {
    state.vendedores = payload
}
const SETUSUARIO = (state, payload) => {
    state.usuario = payload
}

export {
    SETPRODUTOS,
    SETVENDEDORES,
    SETUSUARIO
}