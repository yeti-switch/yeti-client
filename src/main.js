import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueRouter from 'vue-router';
import AntVue from 'ant-design-vue';
import VueI18n from 'vue-i18n';
import Notifications from 'vue-notification';
import 'ant-design-vue/dist/antd.min.css';

import App from './App.vue';
import { router } from './router';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(AntVue);
Vue.use(Notifications);
Vue.use(VueI18n);

Vue.config.productionTip = false;

sync(store, router.instance);

const i18n = new VueI18n();

new Vue({
  render: (h) => h(App),
  store,
  router: router.instance,
  i18n,
}).$mount('#app');

// Setting up page title
document.head.querySelector('title').textContent = YETI_CONFIG.yeti.pageTitle;
