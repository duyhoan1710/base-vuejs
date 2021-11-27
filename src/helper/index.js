import moment from 'moment';
import router from '@/router';
import i18n from '@/plugins/i18n';
import { BadRequest, ServerError, Unauthorized } from '@/constants/common';
import errorCode from '@/constants/errorCode';

export const formatNumber = (value) => {
  if (!value) return 0;

  const roundNumber = Math.round(value * 10) / 10;
  return roundNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatDate = (value) => {
  if (!value) return;
  return moment(value).format('YYYY/MM/DD');
};

export const formatMonth = (value) => {
  if (!value) return;
  return moment(value).format('YYYY-MM');
};

export const formatHour = (value) => {
  if (!value) return;
  return moment(value).format('HH:mm');
};

export const getDateTimeClient = () => {
  return moment().format('YYYYMMDD');
};

export const getFullDate = (value) => {
  return moment(value).format('HH:mm:ss YYYY-MM-DD');
};

export const truncate = (text, length, suffix) => {
  if (text && text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
};

export const formatPhoneNumber = (text) => {
  if (!text) return;
  return (
    text.slice(0, text.length - 8) +
    '-' +
    text.slice(-8, -4) +
    '-' +
    text.slice(-4)
  );
};

export const convertHalfWidth = (value) => {
  if (!value) return;

  return value
    .replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .replace(/[-ー－ｰ−]/, '-')
    .replace('，', ',')
    .replace(/[．。]/, '.');
};

export const formatStartDate = (startDate) => {
  if (!startDate) return '';
  return moment(startDate).startOf('D').toISOString();
};

export const formatEndDate = (endDate) => {
  if (!endDate) return '';
  return moment(endDate).endOf('D').set('millisecond', 0).toISOString();
};

export const redirectRouter = (option) => {
  return router.push(option).catch(() => {});
};

export const notifyMessage = (message, type) => {
  console.log(message, type);
};

export const handleError = (error) => {
  if (error.response.status === Unauthorized) {
    return notifyMessage(i18n.t('error.emailPasswordWrong'), 'error');
  }

  if (error.response.status === ServerError) {
    return notifyMessage('Server Error', 'error');
  }

  if (error.response.status === BadRequest) {
    if (error.response.data.errorCode) {
      return notifyMessage(
        errorCode[error.response.data.errorCode].message,
        'error'
      );
    } else {
      return notifyMessage('Something went wrong!', 'error');
    }
  }
};

export const sleeper = (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve, ms));
};

export const trimValue = (object) => {
  Object.keys(object).forEach((key) => {
    if (object[key]) {
      if (typeof object[key] === 'string') {
        object[key] = object[key].trim();
      }
    } else {
      object[key] = undefined;
    }
  });

  return object;
};
