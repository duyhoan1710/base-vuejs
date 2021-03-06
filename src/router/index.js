import Vue from 'vue';
import VueRouter from 'vue-router';

// import { getToken } from '@/utils/storage.util';
import * as pageName from '@/constants/pageName';
import * as pageRouter from '@/constants/pageRouter';

const LoginPage = () => import('@/views/Auth/Login');
const RegisterCognitoPage = () => import('@/views/Auth/RegisterCognito');
const RegisterPage = () => import('@/views/Auth/Register');

const HomePage = () => import('@/views/Home');
const MedicalDeclarationPage = () => import('@/views/MedicalDeclaration');

Vue.use(VueRouter);

const routes = [
  {
    path: pageRouter.LOGIN,
    component: LoginPage,
    name: pageName.LOGIN,
  },
  {
    path: pageRouter.REGISTER_COGNITO,
    component: RegisterCognitoPage,
    name: pageName.REGISTER_COGNITO,
  },
  {
    path: pageRouter.REGISTER,
    component: RegisterPage,
    name: pageName.REGISTER,
  },
  {
    path: pageRouter.LOGIN,
    component: LoginPage,
    name: pageName.LOGIN,
  },
  {
    path: pageRouter.HOME,
    component: HomePage,
    name: pageName.HOME,
    meta: {
      layout: pageName.LAYOUT,
    },
  },
  {
    path: pageRouter.MEDICAL_DECLARATION,
    component: MedicalDeclarationPage,
    name: pageName.MEDICAL_DECLARATION,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);

  // if (to.name !== pageName.LOGIN && !getToken()) {
  //   next({
  //     name: pageName.LOGIN,
  //   });
  // } else if (to.name === pageName.LOGIN && getToken()) {
  //   next({
  //     name: pageName.HOME,
  //   });
  // } else next();

  next();
});

export default router;
