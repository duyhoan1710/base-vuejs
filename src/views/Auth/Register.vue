<template>
  <div class="content-page register-page auth-page">
    <router-link
      class="link-to-page text-align-right mb20"
      :to="pageRouter.LOGIN"
      >ユーザ登録画面
    </router-link>

    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form class="form" @submit.prevent="handleSubmit(submitForm)">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <TextField
            :title="$t('register.email')"
            :error-messages="errors"
            v-model="form.email"
            outlined
            single-line
          >
          </TextField>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <TextField
            :title="$t('register.codeAuthen')"
            v-model="form.password"
            :error-messages="errors"
            outlined
            single-line
          ></TextField>
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
