import Vue from 'vue'
import Toasted from 'vue-toasted'
import i18n from '@/config/i18n'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg
        ? i18n.tc('messages.defaultSaved')
        : payload.msg, //o payload vai ter uma mensagem, que pode estar setada ou não
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg
        ? i18n.tc('messages.defaultError')
        : i18n.tc(payload.msg),
    { type : 'error', icon : 'times' }
)

Vue.toasted.register(
    'defaultInfo',
    payload => !payload.msg
        ? i18n.tc('messages.defaultError')
        : i18n.tc(payload.msg),
    { type : 'info', icon : 'times' }
)