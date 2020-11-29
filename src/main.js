import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
  import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue';
import App from './App.vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import moment from 'moment'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.filter('formatDate', function(value) {
  if (value && typeof value == 'string') {
    return moment(value).format('DD/MM/YYYY hh:mm')
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
