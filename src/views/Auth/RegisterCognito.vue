<template>
  <div class="register-cognito-page auth-page">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form class="form" @submit.prevent="handleSubmit(submitForm)">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-with-label">
            <label>{{ $t('register.email') }}</label>
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
            <label>{{ $t('register.codeAuthen') }}</label>
            <v-text-field
              v-model="form.password"
              :error-messages="errors"
              outlined
              single-line
            ></v-text-field>
          </div>
        </ValidationProvider>

        <v-btn class="btn btn-submit buttonSubmit" type="submit">{{
          $t('register.btnRegister')
        }}</v-btn>
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
      isLoadingRegister: false,

      form: {
        email: '',
        codeAuthen: '',
      },
    };
  },
  methods: {
    async submitForm() {
      this.isLoadingRegister = true;

      try {
        await authService.register({
          userName: this.loginForm.email,
          password: this.loginForm.password,
        });

        this.$router.push(pageRouter.HOME);
      } catch (error) {
        handleError(error);
      } finally {
        this.isLoadingRegister = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import './styles.module.scss';
</style>
