<template>
  <div class="f-group select-group" :label="label" :label-for="label">
    <p>{{ this.label }}</p>
    <b-form-select
      :value="value"
      :options="options"
      class="custom-input"
      size="sm"
      @input="$emit('input', $event)"
    />
  </div>
</template>
<script>
export default {
  name: "InputSelect",
  props: {
    options: Array,
    label: String,
    value: String,
    allowText: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      select: true,
    };
  },
  methods: {
    toggleSelect() {
      this.select = !this.select;
    },
  },
};
</script>
<style scoped>
p {
  margin: 0px;
}
</style>
