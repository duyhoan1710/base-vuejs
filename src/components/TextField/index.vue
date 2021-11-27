<template>
  <div class="input-with-label">
    <label v-if="!!title">{{ title }}</label>
    <v-text-field v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped></style>
