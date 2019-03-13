import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app')
