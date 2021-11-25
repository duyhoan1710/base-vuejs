import { extend } from 'vee-validate';
import i18n from '@/plugins/i18n';

extend('required', {
  validate: (value) => !!value,
  message: i18n.t('validate.require'),
});
