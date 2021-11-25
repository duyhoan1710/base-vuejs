<template>
  <div class="auth-page login-page" v-if="!isVerifyOTP">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form class="form" @submit.prevent="handleSubmit(submitForm)">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-with-label">
            <label>{{ $t('login.email') }}</label>
            <v-text-field
              :error-messages="errors"
              v-model="form.email"
              outlined
              single-line
            >
            </v-text-field>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-with-label">
            <label>{{ $t('login.password') }}</label>
            <v-text-field
              v-model="form.password"
              :error-messages="errors"
              outlined
              single-line
            ></v-text-field>
          </div>
        </ValidationProvider>

        <router-link class="link-to-page mb-10" :to="pageRouter.REGISTER">{{
          $t('login.linkToForgotPassword')
        }}</router-link>

        <v-btn class="btn btn-submit" type="submit">{{
          $t('login.btnLogin')
        }}</v-btn>
      </v-form>
    </ValidationObserver>
  </div>

  <VerifyOTP v-else />
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import VerifyOTP from './VerifyOTP.vue';

import { authService } from '@/services/auth.service';
import * as pageRouter from '@/constants/pageRouter';
import { handleError } from '@/helper';

export default {
  components: { ValidationProvider, ValidationObserver, VerifyOTP },
  data() {
    return {
      pageRouter,
      isLoadingLogin: false,

      isVerifyOTP: false,
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submitForm() {
      this.isLoadingLogin = true;

      try {
        await authService.login({
          userName: this.form.email,
          password: this.form.password,
        });

        this.$router.push(pageRouter.HOME);
      } catch (error) {
        handleError(error);
      } finally {
        this.isLoadingLogin = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import './styles.module.scss';
</style>
