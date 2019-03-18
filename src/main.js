import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
