import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'The tool has been saved successfully' : payload.msg, //o payload vai ter uma mensagem, que pode estar setada ou não
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Internal error: cannot connect to API' : payload.msg,
    { type : 'error', icon : 'times' }
)