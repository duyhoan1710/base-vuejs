<template>
  <div class="layout">
    <Header @toggleMenu="toggleMenu" :isOpen="isOpen" />

    <!-- <el-row type="flex" class="body">
      <el-col
        :span="3"
        class="component-left"
        :class="{ moveMenuToLeft: !isOpen }"
      >
        <SideNav @toggleMenu="toggleMenu" @closeMenu="closeMenu" />
      </el-col>

      <el-col :span="isOpen ? 21 : 24" class="component-right">
        <slot></slot>
      </el-col>

      <div
        class="overlay"
        :class="{ hidden: !isOpen }"
        v-on:click="toggleMenu()"
      />
    </el-row> -->

    <slot />
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'layout',
  components: {
    Header,
  },
  data: () => {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles.module.scss';
</style>
