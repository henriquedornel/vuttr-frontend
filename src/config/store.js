import Vue from 'vue'
import Vuex from 'vuex' //Para manipular o state global (equivalente ao Redux para o React)

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalTitle: '',
        tool: {},
        tools: [],
        search: '',
        tagsOnly: false,
        searchSpinner: false,
        count: 0,
        page: 1,
        limit: 3
    },
    mutations: {
        mutate: (state, payload) => state[payload.prop] = payload.with
    }
})