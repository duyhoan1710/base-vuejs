import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

import ja from '../locales/ja';
import vn from '../locales/vn';

const messages = {
  vn,
  ja,
};

export default new VueI18n({
  locale: 'ja',
  messages,
});
