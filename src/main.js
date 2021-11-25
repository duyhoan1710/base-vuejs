import Vue from 'vue';

import router from '@/router';
import { store } from '@/store';
import i18n from '@/plugins/i18n';
// import vuetify from '@/plugins/vuetify';

import '@/plugins/veeValidate';
import '@/helper/vee-validate';

import '@/styles/index.scss';

import App from '@/App.vue';
import Layout from '@/components/Layout';
import { LAYOUT } from '@/constants/pageName';
import vuetify from './plugins/vuetify';

Vue.component(LAYOUT, Layout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,

  // vuetify,

  render: function (h) {
    return h(App);
  },
}).$mount('#app');
