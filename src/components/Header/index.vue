<template>
  <div class="header">
    <div class="logo-wrap">
      <div v-on:click="toggleMenu()">
        <img :src="openIcon" class="icon-open-menu" v-if="!isOpen" />
        <img v-else :src="closeIcon" class="icon-colse-menu" />
      </div>

      <div class="logo">
        <div class="logo-avatar">
          <img src="@/assets/images/logo-page.png" alt="logo-page" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import closeIcon from '@/assets/images/close_menu.svg';
import openIcon from '@/assets/images/menu.svg';

import * as pageRouter from '@/constants/pageRouter';

export default {
  data() {
    return {
      closeIcon,
      openIcon,
      pageRouter,
    };
  },
  props: {
    isOpen: Boolean,
  },
  computed: {},
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles.module.scss';
</style>
