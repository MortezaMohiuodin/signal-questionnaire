import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import { BootstrapVue} from 'bootstrap-vue'
import vSelect from 'vue-select'

Vue.use(BootstrapVue)
Vue.component('v-select', vSelect)



// Plugins
import './plugins/veeValidate'
import './plugins/vueAwesome'

// Css files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'
import 'vue-select/dist/vue-select.css';
import './assets/css/style.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
