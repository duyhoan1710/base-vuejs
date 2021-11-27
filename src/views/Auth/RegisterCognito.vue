<template>
  <div class="content-page register-cognito-page auth-page">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form class="form" @submit.prevent="handleSubmit(submitForm)">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <TextField
            :error-messages="errors"
            v-model="form.email"
            outlined
            single-line
            :title="$t('registerCognito.email')"
          >
          </TextField>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <TextField
            :title="$t('registerCognito.password')"
            v-model="form.password"
            :error-messages="errors"
            outlined
            single-line
          ></TextField>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <v-checkbox
            v-model="form.useOfTerm"
            :error-messages="errors"
            :label="$t('registerCognito.termOfUse')"
          ></v-checkbox>
        </ValidationProvider>

        <v-btn class="btn btn-submit buttonSubmit" type="submit">{{
          $t('registerCognito.btnRegister')
        }}</v-btn>

        <router-link
          :to="pageRouter.LOGIN"
          class="link-to-page text-align-center mt-20"
        >
          {{ $t('registerCognito.linkToLogin') }}
        </router-link>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import TextField from '@/components/TextField';

import { authService } from '@/services/auth.service';
import * as pageRouter from '@/constants/pageRouter';
import { handleError } from '@/helper';

export default {
  components: { ValidationProvider, ValidationObserver, TextField },
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
