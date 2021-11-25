<template>
  <el-menu
    :default-active="currentKey"
    class="el-menu-vertical-demo side-nav"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item
      :index="pageName.EMPLOYEE"
      @click="clickMenu(pageName.EMPLOYEE)"
      class="menu-item"
    >
      <i class="el-icon-user-solid"></i>
      <span> {{ $t('menu.employee') }} </span>
    </el-menu-item>

    <el-menu-item
      :index="pageName.PRODUCT"
      @click="clickMenu(pageName.PRODUCT)"
      class="menu-item"
    >
      <i class="el-icon-goods"></i>
      <span> {{ $t('menu.product') }} </span>
    </el-menu-item>

    <el-menu-item
      :index="pageName.STORE"
      @click="clickMenu(pageName.STORE)"
      class="menu-item"
    >
      <i class="el-icon-shopping-cart-full"></i>
      <span> {{ $t('menu.store') }} </span>
    </el-menu-item>

    <el-menu-item
      :index="pageName.CATEGORY"
      @click="clickMenu(pageName.CATEGORY)"
      class="menu-item"
    >
      <i class="el-icon-coin"></i>
      <span> {{ $t('menu.masterData') }} </span>
    </el-menu-item>

    <el-submenu class="menu-group" index="history">
      <template slot="title">
        <img src="@/assets/images/group-user-active.svg" class="icon-menu" />
        <span> {{ $t('menu.history') }} </span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          class="sub-menu-item"
          :index="pageName.USER"
          @click="clickMenu(pageName.USER)"
        >
          {{ $t('menu.user') }}
        </el-menu-item>
        <el-menu-item
          class="sub-menu-item"
          :index="pageName.PRODUCT_HISTORY"
          @click="clickMenu(pageName.PRODUCT_HISTORY)"
        >
          {{ $t('menu.productHistory') }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { redirectRouter } from '@/helper';
import * as pageName from '@/constants/pageName';

export default {
  data: () => {
    return {
      pageName,
      currentKey: '',
    };
  },
  created() {
    this.currentKey = this.$router.currentRoute.name;
  },
  computed: {},
  methods: {
    handleOpen() {},
    handleClose() {
      this.$emit('closeMenu');
    },
    clickMenu(name) {
      redirectRouter({ name });
      this.handleClose();
    },
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },
};
</script>

<style lang="scss">
@import './styles.module.scss';
</style>
