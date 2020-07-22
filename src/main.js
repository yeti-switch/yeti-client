import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import AntVue from 'ant-design-vue';
import Notifications from 'vue-notification';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'ant-design-vue/dist/antd.min.css';

import App from './App.vue';
import { router } from './router';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(AntVue);
Vue.use(Notifications);

Vue.config.productionTip = false;

sync(store, router.instance);

new Vue({
  render: (h) => h(App),
  store,
  router: router.instance,
}).$mount('#app');

// Setting up page title
document.head.querySelector('title').textContent = YETI_CONFIG.yeti.pageTitle;
