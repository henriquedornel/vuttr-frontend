import Vue from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faGlobe, faSearch, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import 'font-awesome/css/font-awesome.css'

library.add(faGlobe, faSearch, faPlus, faEllipsisV )

Vue.component('fa-icon', FontAwesomeIcon)