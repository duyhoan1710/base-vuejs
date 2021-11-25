<template>
  <v-app>
    <component :is="this.$route.meta.layout || 'div'" class="wrap-content">
      <router-view />
    </component>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
