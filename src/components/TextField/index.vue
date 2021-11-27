<template>
  <div :class="title ? 'input-with-label' : 'input-native'">
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
