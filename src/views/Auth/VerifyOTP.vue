<template>
  <div class="content-page verify-otp-page auth-page">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form class="form" @submit.prevent="handleSubmit(submitForm)">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <TextField
            :title="$t('login.email')"
            :error-messages="errors"
            v-model="form.code"
            outlined
            single-line
          >
          </TextField>
        </ValidationProvider>

        <v-btn class="btn btn-submit" type="submit">{{
          $t('login.btnLogin')
        }}</v-btn>

        <router-link :to="pageRouter.LOGIN" class="link-to-page mt-20">{{
          $t('verifyOTP.linkToLogin')
        }}</router-link>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import { authService } from '@/services/auth.service';
import * as pageRouter from '@/constants/pageRouter';
import { handleError } from '@/helper';

export default {
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      pageRouter,
      isLoadingVerifyOTP: false,

      form: {
        code: '',
      },
    };
  },
  methods: {
    async submitForm() {
      this.isLoadingVerifyOTP = true;

      try {
        await authService.login({
          userName: this.form.email,
          password: this.form.password,
        });

        this.$router.push(pageRouter.HOME);
      } catch (error) {
        handleError(error);
      } finally {
        this.isLoadingVerifyOTP = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import './styles.module.scss';
</style>
