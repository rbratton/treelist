import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faClock, faInfoCircle, faUser, faUsers, faCaretDown, faCaretUp, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faEnvelope,
  faClock,
  faInfoCircle,
  faUser,
  faUsers,
  faCaretDown,
  faCaretUp,
  faPhone
])

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
