<template>
  <div class="medical-declaration-page">
    <div class="content-page">
      <ValidationObserver v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(submitForm)">
          <div class="block-declare block-name">
            <v-avatar color="primary" size="40" class="avatar mr-2">
              <span class="text-white">HN</span>
            </v-avatar>

            <span>Duyhoan様</span>
          </div>

          <div class="block-declare block-description">
            <h2>新型コロナワクチン接種（N回目接種）</h2>
            <h2>11/24furutachi</h2>
            <div>アンケートの説明</div>
            <span class="text-required">*必須</span>
          </div>

          <div class="block-declare">
            <h3>予約をする前に</h3>
            <p class="description">
              入力されている接種券番号、生年月日、性別、接種回数をよくお確かめの上、接種会場を選択して予約日時を指定してください。もし違う場合は日時の指定を行わず、担当課までお電話をください。
            </p>
          </div>

          <div class="block-declare">
            <h3>接種券番号 *</h3>
            <ValidationProvider rrules="required" v-slot="{ errors }">
              <TextField
                v-model="form.ticket"
                :error-messages="errors"
                class="input-native"
                disabled
              />
            </ValidationProvider>
          </div>

          <div class="block-declare">
            <h3>生年月日 *</h3>
            <ValidationProvider rrules="required" v-slot="{ errors }">
              <TextField
                v-model="form.birthday"
                class="input-native"
                disabled
                placeholder="1990/01/01"
                :error-messages="errors"
              />
            </ValidationProvider>
          </div>

          <div class="block-declare">
            <h3>性別 *</h3>
            <ValidationProvider rrules="required" v-slot="{ errors }">
              <v-radio-group v-model="form.gender" :error-messages="errors">
                <v-radio
                  v-for="el in Object.keys(genderEnum.data)"
                  :key="el"
                  :label="el"
                  :value="genderEnum[el]"
                ></v-radio>
              </v-radio-group>
            </ValidationProvider>
          </div>

          <div class="block-declare">
            <h3>注意事項</h3>
            <p class="description">
              前回の接種から十分な接種間隔を空け、前回と同じ種類のワクチンであることを確認の上、ご予約ください。
            </p>
          </div>

          <div class="block-declare">
            <h3>前回の接種実施日</h3>
            <DatePicker v-model="form.lastVaccinationDate"></DatePicker>
          </div>

          <div class="block-declare">
            <h3>前回の接種ワクチンのメーカー</h3>
            <v-radio-group v-model="form.manufacturerLastVaccine">
              <v-radio
                v-for="el in manufacturerLastVaccineList"
                :key="el.value"
                :label="el.label"
                :value="el.value"
              ></v-radio>
            </v-radio-group>
          </div>

          <div class="block-declare">
            <h3>分類 *</h3>
            <ValidationProvider rrules="required" v-slot="{ errors }">
              <TextField
                v-model="form.classification"
                :error-messages="errors"
              />
            </ValidationProvider>
          </div>

          <v-btn class="btn btn-submit buttonSubmit" type="submit"
            >予約日時指定に進む</v-btn
          >
        </v-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DatePicker from '@/components/DatePicker';
import TextField from '@/components/TextField';

import { authService } from '@/services/auth.service';
import * as pageRouter from '@/constants/pageRouter';
import { handleError } from '@/helper';
import genderEnum from '@/enums/gender';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    DatePicker,
    TextField,
  },
  data() {
    return {
      genderEnum,
      manufacturerLastVaccineList: [
        {
          value: 1,
          label: 'ファイザーtest',
        },
      ],
      form: {
        ticket: '',
        birthday: '',
        gender: '',
        lastVaccinationDate: '2020-11-01',
        manufacturerLastVaccine: '',
        classification: '',
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

<style lang="scss" scoped>
@import 'styles.module.scss';
</style>
