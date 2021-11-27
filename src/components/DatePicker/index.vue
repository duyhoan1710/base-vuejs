<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        readonly
        v-model="selected"
        v-on:input="$emit('input', $event)"
        v-on="on"
        v-bind="$attrs"
      ></v-text-field>
    </template>

    <v-date-picker v-model="selected" v-bind="$attrs" v-on="$listeners">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(selected)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: [Date, String, Array],
      default: '',
    },
  },
  data: () => ({
    menu: false,
  }),
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
